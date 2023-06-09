import Joi from "joi";

/**
 * Schema to validate data on a Product object
 */
export const fullProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().min(1).required(),
  stock: Joi.number().integer().min(0).required(),
  category: Joi.string().required(),
});

/**
 * Schema to validate data on a partial Product object
 */
export const partialProductSchema = Joi.object({
  name: Joi.string().min(1).optional(),
  description: Joi.string().min(1).optional(),
  price: Joi.number().positive().min(1).optional(),
  stock: Joi.number().integer().min(0).optional(),
  category: Joi.string().min(1).optional(),
}).min(1);

export const fullUserSchema = Joi.object({
  dni: Joi.string().required(),
  username: Joi.string().min(4).max(10).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().optional(),
  password: Joi.string().required(),
  email: Joi.string().required(),
  cellphone: Joi.string().regex(/^\d+$/).required(),
  active: Joi.boolean().default(true).optional(),
});

export const partialUserSchema = Joi.object({
  dni: Joi.string().optional(),
  username: Joi.string().min(4).max(10).optional(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  email: Joi.string().optional(),
  cellphone: Joi.string().regex(/^\d+$/).optional(),
  active: Joi.boolean().default(true).optional(),
});
