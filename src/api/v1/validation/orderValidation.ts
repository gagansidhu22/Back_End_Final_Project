import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateOrder:
 *       type: object
 *       required:
 *         - userId
 *         - menuId
 *         - quantity
 *         - totalPrice
 *         - status
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user placing the order
 *           example: "user_abc123"
 *         menuId:
 *           type: string
 *           description: The ID of the menu item being ordered
 *           example: "menu_abc123"
 *         quantity:
 *           type: number
 *           description: Quantity of the menu item
 *           example: 2
 *         totalPrice:
 *           type: number
 *           description: Total price for the order
 *           example: 49.99
 *         status:
 *           type: string
 *           description: Current status of the order
 *           enum:
 *             - pending
 *             - completed
 *             - cancelled
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
 *             - completed
 *             - cancelled
 *           example: "completed"
 */

export const createOrderSchema = Joi.object({
  userId: Joi.string().required(),
  menuId: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
  totalPrice: Joi.number().min(0).required(),
  status: Joi.string().valid("pending", "completed", "cancelled").default("pending"),
});

export const updateOrderSchema = Joi.object({
  status: Joi.string().valid("pending", "completed", "cancelled").required(),
});
