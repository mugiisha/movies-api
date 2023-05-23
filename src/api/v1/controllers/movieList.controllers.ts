import MovieListService from "../services/movieList.services";
import { Request, Response, NextFunction } from "express";
import { failureResponse, successResponse } from "../utils/apiResponse";

export const getListMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { listId } = req.params;

    const listmovies = await MovieListService.getListMovies(+listId);

    if (!listmovies) {
      return failureResponse(res, {
        message: "list movies not found",
        status: 404,
      });
    }

    return successResponse(res, {
      message: "list movies retrieved successfully",
      data: listmovies,
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

export const addMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { rank } = req.body;
    const { listId, movieId } = req.params;
    console.log("=====", movieId);

    const movie = await MovieListService.addMovie(+movieId, +listId, +rank);

    if (!movie) {
      return failureResponse(res, {
        message: "adding movie to list failed",
        status: 403,
      });
    }

    return successResponse(res, {
      message: "movie added to list successfully",
      data: movie,
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

export const removeMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { listId, movieId } = req.params;
    console.log("=====", movieId, listId);
    await MovieListService.removeMovie(+listId, +movieId);

    return successResponse(res, {
      message: "movie removed from list successfully",
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

export const updateRank = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { listId, movieId } = req.params;
    const { rank } = req.body;

    const movie = await MovieListService.getSingleMovie(+listId, +movieId);

    if (!movie) {
      return failureResponse(res, {
        message: "movie not found in the list",
        status: 404,
      });
    }

    const updatedMovie = await MovieListService.updateRank(
      +listId,
      +movieId,
      +rank
    );

    return successResponse(res, {
      message: "movie rank updated successfully",
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
