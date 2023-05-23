import bcrypt from "bcryptjs";
import ListServices from "../services/lists.services";
import { Request, Response, NextFunction } from "express";
import UserService from "../services/users.services";
import { failureResponse, successResponse } from "../utils/apiResponse";

export const getUserLists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.user;

    const user = await UserService.getSingleUser(userId);

    const userLists = await user?.getLists();
    if (!userLists) {
      return failureResponse(res, {
        message: "user lists not found",
        status: 404,
      });
    }

    return successResponse(res, {
      message: "user lists retrieved successfully",
      data: userLists,
      status: 200,
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

export const getSingleList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { listId } = req.params;

    const list = await ListServices.getSingleList(+listId);

    if (!list) {
      return failureResponse(res, { message: `list not found`, status: 404 });
    }

    return successResponse(res, {
      message: "list retrieved successfully",
      data: list,
      status: 200,
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

export const deleteList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { listId } = req.params;

    const list = await ListServices.getSingleList(+listId);

    if (!list) {
      return failureResponse(res, {
        message: "list not found",
        status: 404,
      });
    }

    await ListServices.deleteList(+listId);
    return successResponse(res, { message: "list deleted successfully" });
  } catch (error) {
    console.log(error);
    return failureResponse(res, {
      message: "server error",
      status: 500,
      error,
    });
  }
};

export const createList = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const { id: userId } = req.user;

    const newList = await ListServices.addList({ name, userId });

    if (!newList) {
      return failureResponse(res, {
        message: "creating list failed",
        status: 403,
      });
    }

    return successResponse(res, {
      message: "list created successfully",
      data: newList,
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
