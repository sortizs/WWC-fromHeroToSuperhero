import Joi from "joi";

/**
 * Schema to validate data on a Product object
 */
export const fullSchema = Joi.object({
  id: Joi.number().integer().required(),
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
  id: Joi.number().integer().optional(),
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().positive().min(1).optional(),
  stock: Joi.number().integer().min(0).optional(),
  category: Joi.string().optional(),
}).min(1);
