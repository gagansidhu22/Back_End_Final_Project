import Joi from "joi";

export const createOrderSchema = Joi.object({
  userId: Joi.string().required(),
  items: Joi.array().items(Joi.string().required()).min(1).required(),
  totalAmount: Joi.number().min(0).required(),
  status: Joi.string()
    .valid("pending", "preparing", "ready", "completed")
    .default("pending"),
});

export const updateOrderSchema = Joi.object({
  status: Joi.string().valid("pending", "preparing", "ready", "completed"),
});
