import httpStatus from "http-status";
import AppError from "../error/AppError";
import { TUserRoles } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...permittedRoles: TUserRoles[]) => {
  return catchAsync(async (req, _res, next) => {
    // check if the token availabe
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You do not have the necessary permissions to access this resource.",
      );
    }

    // check if the token is valid
    const decode = jwt.verify(
      token,
      config.JWT_ACCESS_TOKEN_SECRET as string,
    ) as JwtPayload;

    // check if the role is authorized
    const { role } = decode;

    if (permittedRoles && !permittedRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You do not have the necessary permissions to access this resource.",
      );
    }

    req.user = decode;

    return next();
  });
};

export default auth;
