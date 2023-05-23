import { Router } from "express";
import { addUser,login } from "../controllers/auth.controllers";
import { validateSchema } from "../middlewares/validate";
import { signupSchema } from "../validators/user";

const authRoutes = Router()

authRoutes.post("/signup",validateSchema(signupSchema), addUser);
authRoutes.post("/login", login);

export default authRoutes