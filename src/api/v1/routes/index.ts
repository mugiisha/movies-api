import { Router } from "express";
import userRoutes from "./users.routes";
import authRoutes from "./auth.routes";
import movieRouter from "./movies.routes";
import listsRouter from "./lists.routes";
import movieListRouter from "./movieList.routes";


const router = Router();

router.use("/users", userRoutes);
router.use('/auth', authRoutes)
router.use('/movies', movieRouter)
router.use('/lists', listsRouter)
router.use('/movie-list', movieListRouter)

export default router;
