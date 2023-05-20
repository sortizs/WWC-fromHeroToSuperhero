import {
  fullProductSchema,
  partialProductSchema,
  fullUserSchema,
  partialUserSchema,
} from "../models/schema.js";

export function validateFullProduct(req, _res, next) {
  const { error, _value } = fullProductSchema.validate(req.body);
  if (error) {
    next(new Error(error.message));
  } else {
    next();
  }
}

export function validatePartialProduct(req, _res, next) {
  const { error, _value } = partialProductSchema.validate(req.body);
  if (error) {
    next(new Error(error.message));
  } else {
    next();
  }
}

export function validateFullUser(req, _res, next) {
  const { error, _value } = fullUserSchema.validate(req.body);
  if (error) {
    next(new Error(error.message));
  } else {
    next();
  }
}

export function validatePartialUser(req, _res, next) {
  const { error, _value } = partialUserSchema.validate(req.body);
  if (error) {
    next(new Error(error.message));
  } else {
    next();
  }
}
