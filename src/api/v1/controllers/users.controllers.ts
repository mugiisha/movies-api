import bcrypt from "bcryptjs";
import User from "../database/models/user";
import UserService from "../services/users.services";
import { Request, Response, NextFunction } from "express";
import { failureResponse, successResponse } from "../utils/apiResponse";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserService.getAll();

    if (!users) {
      return failureResponse(res, {
        message: "users not found",
        status: 404,
      });
    }

    return successResponse(res, {
      message: "users retrieved successfully",
      status: 200,
      data: users,
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

export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    const user = await UserService.getSingleUser(+userId);

    if (!user) {
      return failureResponse(res, { message: "user not found" });
    }

    return successResponse(res, {
      message: "user retrieved successfully",
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

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;

    const user = await UserService.getSingleUser(userId);

    if (!user) {
      return res.status(404).json({ message: `user not found` });
    }

    await UserService.deleteUser(userId);
    return res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error", error });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const saltNumber = Number(process.env.SALT_NUMBER);
    const userId = req.user.id;

    const user = await UserService.getSingleUser(userId);

    const options = req.body;

    if (!user) {
      return res.status(404).json({ message: `user not found` });
    }

    if (options.password) {
      options.password = await bcrypt.hash(options.password, saltNumber);
    }

    const update = await UserService.updateUser(userId, options);

    return res
      .status(200)
      .json({ message: "user updated successfully", update });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error", error });
  }
};
