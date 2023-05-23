import { Router } from "express";
import { addMovie,getListMovies,removeMovie, updateRank } from "../controllers/movieList.controllers";
import { verifyToken } from "../middlewares/jwtAuth";

const movieListRouter = Router();
movieListRouter.use(verifyToken);

movieListRouter.get("/:listId", getListMovies);
movieListRouter.post("/:listId/:movieId", addMovie);
movieListRouter.patch("/:listId/:movieId", updateRank);
movieListRouter.delete("/:listId/:movieId", removeMovie);

export default movieListRouter;
