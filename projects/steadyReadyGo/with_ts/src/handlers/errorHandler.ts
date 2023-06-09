import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export function errorLogger(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.message);
  next(err);
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(StatusCodes.BAD_REQUEST).json({
    code: StatusCodes.BAD_REQUEST,
    status: "Bad Request",
    message: err.message,
  });
}
