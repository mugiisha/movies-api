import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../database/models/user";
import "dotenv/config";

const jwt_secret = String(process.env.JWT_SECRET_KEY);
const jwt_token_expires = String(process.env.JWT_TOKEN_EXPIRES);


export const assignToken = async (user: User): Promise<string> => {
  return jwt.sign({ user }, jwt_secret, {
    expiresIn: jwt_token_expires,
  });
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "user unauthorized" });
  }

  jwt.verify(token, jwt_secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "user Unauthorized" });
    }
    //@ts-ignore
    req.user = decoded.user;
    next();
  });
};
