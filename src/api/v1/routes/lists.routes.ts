import { Router } from "express";
import { getUserLists,deleteList,getSingleList, createList } from "../controllers/lists.controllers.";
import { verifyToken } from "../middlewares/jwtAuth";

const listsRouter = Router();

listsRouter.use(verifyToken)
listsRouter.get("/", getUserLists);
listsRouter.get("/:listId", getSingleList);
listsRouter.delete("/:listId", deleteList);
listsRouter.post("/", createList);

export default listsRouter;
