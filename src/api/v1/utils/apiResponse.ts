import { Response } from "express";

interface ApiResponse {
    message?: string,
    status?:number
}


interface SuccessResponse extends ApiResponse {
  data?: unknown;
}
interface ErrorResponse extends ApiResponse {
  error?: unknown;
}

export const successResponse = (
  res: Response,
  { message = "Success", status = 200, data = {} }: SuccessResponse
) => {
  return res.status(status).json({
    message,
    data,
  });
};

export const failureResponse = (
  res: Response,
  { message = "Error", status = 500, error = {} }: ErrorResponse
) => {
  return res.status(status).json({
    message,
    error,
  });
};