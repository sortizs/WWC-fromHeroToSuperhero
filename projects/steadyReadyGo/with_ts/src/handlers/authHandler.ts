import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jsonwebtoken from "jsonwebtoken";

export function isAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  let decodedToken;

  if (auth && JWT_SECRET_KEY) {
    try {
      decodedToken = jsonwebtoken.verify(auth, JWT_SECRET_KEY);
      if (decodedToken) {
        next();
      } else {
        res.status(StatusCodes.FORBIDDEN).json({
          code: StatusCodes.FORBIDDEN,
          status: "Access forbidden",
        });
        return;
      }
    } catch (err: any) {
      console.log(err);
      res.status(StatusCodes.UNAUTHORIZED);
      res.send(err.message || "Access unauthorized");
      return;
    }
  } else {
  }
}
