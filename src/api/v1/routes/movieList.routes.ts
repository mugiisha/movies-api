import { Router } from "express";
import { addMovie,getListMovies,removeMovie, updateRank } from "../controllers/movieList.controllers";
import { verifyToken } from "../middlewares/jwtAuth";

const movieListRouter = Router();
movieListRouter.use(verifyToken);

movieListRouter.get("/:listId", getListMovies);
movieListRouter.post("/:listId/:movieid", addMovie);
movieListRouter.patch("/:listId/:movieid", updateRank);
movieListRouter.delete("/:listId/:movieid", removeMovie);

export default movieListRouter;
