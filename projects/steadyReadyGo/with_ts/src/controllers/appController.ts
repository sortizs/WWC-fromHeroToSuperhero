import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export function healthCheck(req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    uptime: process.uptime(),
    message: "Healthy",
    timestamp: Date.now(),
  });
}

export function welcomePage(req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    message: "Welcome Steady Ready GO! with TypeScript",
  });
}
