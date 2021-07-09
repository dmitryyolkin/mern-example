import { Request } from "express";

export type JwtUser = {
  userId: string;
}

export interface RequestWithJwtUser extends Request {
  user: JwtUser
}
