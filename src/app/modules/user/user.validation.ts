import { z } from "zod";

const passwordValidation = (password: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

  return regex.test(password);
};

const createUserValidationSchema = z.object({
  username: z.string({
    required_error: "User name is required!",
    invalid_type_error: "User name must be string!",
  }),
  email: z.string({
    required_error: "User email is required!",
    invalid_type_error: "User email must be string!",
  }),
  password: z
    .string({
      required_error: "User password is required!",
      invalid_type_error: "User password must be string!",
    })
    .min(5)
    .refine(passwordValidation, {
      message:
        "Invalid password. It must contain at least one lowercase letter, one uppercase letter, and one digit.",
    }),
  role: z.string({
    required_error: "User role is required!",
    invalid_type_error: "User role must be string!",
  }),
});

const loginUserValidationSchema = z.object({
  username: z.string({
    required_error: "User name is required!",
    invalid_type_error: "User name must be string!",
  }),
  password: z
    .string({
      required_error: "User password is required!",
      invalid_type_error: "User password must be string!",
    })
    .min(5)
    .refine(passwordValidation, {
      message:
        "Invalid password. It must contain at least one lowercase letter, one uppercase letter, and one digit.",
    }),
});

export const UserValidations = {
  createUserValidationSchema,
  loginUserValidationSchema,
};
