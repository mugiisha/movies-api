import { assignToken } from "./../middlewares/jwtAuth";
import UserService from "../services/users.services";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { failureResponse, successResponse } from "../utils/apiResponse";

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { name, email, password } = req.body;

    const existingUser = await UserService.querySingleUser({
      where: {
        email,
      },
    });

    if (existingUser) {
      return failureResponse(res, {
        message: "user already exists",
        status: 400,
      });
    }

    const saltNumber = Number(process.env.SALT_NUMBER);
    const hashedPassword = await bcrypt.hash(password, saltNumber);

    const user = await UserService.addUser({
      name,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return failureResponse(res, {
        message: "creating user failed",
        status: 403,
      });
    }

    return successResponse(res, {
      message: "user created successfully",
      status: 201,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return failureResponse(res, {
      message: "server error",
      status: 500,
      error,
    });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.querySingleUser({ where: { email } });

    if (!user) {
      return failureResponse(res, { message: "user not found", status: 404 });
    }

    var passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return failureResponse(res, {
        message: "invalid credentials",
        status: 400,
      });
    }

    const token = await assignToken(user);

    return successResponse(res, {
      message: `user ${user.name} logged in successfully`,
      data: { token, user: user.name },
    });
  } catch (error) {
    console.log(error);
    return failureResponse(res, {
      message: "server error",
      status: 500,
      error,
    });
  }
};
