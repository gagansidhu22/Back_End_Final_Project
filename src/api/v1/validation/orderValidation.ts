import Joi from "joi";
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateOrder:
 *       type: object
 *       required:
 *         - userId
 *         - items
 *         - totalAmount
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user placing the order
 *           example: "user_abc123"
 *         items:
 *           type: array
 *           description: Array of item IDs included in the order
 *           items:
 *             type: string
 *             example: "item_abc123"
 *           minItems: 1
 *         totalAmount:
 *           type: number
 *           description: Total amount for the order
 *           example: 49.99
 *         status:
 *           type: string
 *           description: Current status of the order
 *           enum:
 *             - pending
 *             - preparing
 *             - ready
 *             - completed
 *           example: "pending"
 *
 *     UpdateOrder:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: Updated status of the order
 *           enum:
 *             - pending
 *             - preparing
 *             - ready
 *             - completed
 *           example: "preparing"
 */


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
