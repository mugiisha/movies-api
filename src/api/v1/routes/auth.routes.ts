import { Router } from "express";
import { addUser,login } from "../controllers/auth.controllers";

const authRoutes = Router()

authRoutes.post("/signup", addUser);
authRoutes.post("/login", login);

export default authRoutes