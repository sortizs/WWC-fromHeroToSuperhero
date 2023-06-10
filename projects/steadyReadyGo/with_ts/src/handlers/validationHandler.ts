import { NextFunction, Request, Response } from "express";
import {
  fullProductSchema,
  partialProductSchema,
  fullUserSchema,
  partialUserSchema,
} from "../models";

export function validateFullProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = fullProductSchema.validate(req.body);
  if (error) {
    next(new Error(error.message));
  } else {
    next();
  }
}

export function validatePartialProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = partialProductSchema.validate(req.body);
  if (error) {
    next(new Error(error.message));
  } else {
    next();
  }
}

export function validateFullUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = fullUserSchema.validate(req.body);
  if (error) {
    next(new Error(error.message));
  } else {
    next();
  }
}

export function validatePartialUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = partialUserSchema.validate(req.body);
  if (error) {
    next(new Error(error.message));
  } else {
    next();
  }
}
