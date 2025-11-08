import Joi from "joi";

export const createMenuSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  category: Joi.string().min(2).max(50).required(),
  price: Joi.number().min(0).required(),
  available: Joi.boolean().required(),
});

export const updateMenuSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  category: Joi.string().min(2).max(50),
  price: Joi.number().min(0),
  available: Joi.boolean(),
});
