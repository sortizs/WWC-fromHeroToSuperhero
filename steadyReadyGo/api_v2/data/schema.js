import Joi from "joi";

/**
 * Schema to validate data on a Product object
 */
export const fullSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().min(1).required(),
  stock: Joi.number().integer().min(0).required(),
  category: Joi.string().required(),
});

/**
 * Schema to validate data on a partial Product object
 */
export const partialSchema = Joi.object({
  name: Joi.string().min(1).optional(),
  description: Joi.string().min(1).optional(),
  price: Joi.number().positive().min(1).optional(),
  stock: Joi.number().integer().min(0).optional(),
  category: Joi.string().min(1).optional(),
}).min(1);
