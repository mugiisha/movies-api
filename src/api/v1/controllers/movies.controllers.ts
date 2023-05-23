import { Request, Response, NextFunction } from "express";
import { MovieService } from "../services/movies.services";
import { failureResponse, successResponse } from "../utils/apiResponse";

export const getMovies = async (req: Request, res: Response) => {
  try {
    const result = await MovieService.getMovies();

     return successResponse(res, {
       message: "movies retrieved successfully",
       data: result.data,
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

export const getMovieById = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    const result = await MovieService.getMovieById(+movieId);

    return successResponse(res, {
      message: "movie retrieved successfully",
      data: result.data,
    })
  } catch (error) {
    console.log(error);
    return failureResponse(res, {
      message: "server error",
      status: 500,
      error,
    });
  }
};


