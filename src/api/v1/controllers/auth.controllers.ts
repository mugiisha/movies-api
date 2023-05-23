import { assignToken } from "./../middlewares/jwtAuth";
import UserService from "../services/users.services";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import "dotenv/config";

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { name, email, password } = req.body;

    const saltNumber = Number(process.env.SALT_NUMBER);
    const hashedPassword = await bcrypt.hash(password, saltNumber);

    const user = await UserService.addUser({
      name,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(403).json({ message: "creating user failed" });
    }

    return res.status(200).json({ message: "user added successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error", error });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.querySingleUser({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    var passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    const token = await assignToken(user);

    return res.status(200).json({
      message: `user ${user.name} logged in successfully`,
      token,
      user: user.name,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error", error });
  }
};
