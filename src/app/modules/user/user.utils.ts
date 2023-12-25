import jwt from "jsonwebtoken";
import { IJWTPayload } from "./user.interface";

export const createToken = (
  payload: IJWTPayload,
  secret: string,
  expiresIn: string,
) => {
  const iat = Math.floor(Date.now() / 1000);
  const unit = expiresIn.charAt(expiresIn.length - 1);
  const duration = parseInt(expiresIn.slice(0, -1), 10);

  let exp = duration;

  if (unit === "s") {
    exp = duration;
  } else if (unit === "m") {
    exp = duration * 60;
  } else if (unit === "h") {
    exp = duration * 60 * 60;
  } else if (unit === "d") {
    exp = duration * 60 * 60 * 24;
  }

  exp += iat;

  const jwtPayload = { ...payload, iat, exp };

  return jwt.sign(jwtPayload, secret);
};
