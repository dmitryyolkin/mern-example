import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "config";
import { JwtUser, RequestWithJwtUser } from "../interfaces";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN
    if (!token) {
      return res.status(401).json({ message: "No auth token" });
    }

    const reqWithJwtUser = <RequestWithJwtUser>req;
    reqWithJwtUser.user = <JwtUser>jwt.verify(token, config.get("jwtSecret"));
    next();
  } catch (e) {
    return res.status(401).json({ message: "Auth token is invalid" });
  }
};
