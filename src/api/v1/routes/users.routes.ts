
import { Router } from "express";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  getSingleUser,

} from "../controllers/users.controllers";
import { verifyToken } from "../middlewares/jwtAuth";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.get("/:userId", getSingleUser);
userRoutes.patch("/",verifyToken, updateUser);
userRoutes.delete("/",verifyToken, deleteUser);

export default userRoutes;
