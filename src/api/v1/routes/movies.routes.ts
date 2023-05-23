import { Router } from "express";
import { getMovies, getMovieById } from "../controllers/movies.controllers";

const movieRouter = Router()

movieRouter.get('/',getMovies )
movieRouter.get("/:movieId", getMovieById);

export default movieRouter