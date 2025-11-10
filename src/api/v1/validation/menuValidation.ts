import Joi from "joi";
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateMenu:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - price
 *         - available
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the menu item
 *           example: "Veggie Burger"
 *         category:
 *           type: string
 *           description: The category of the menu item
 *           example: "Main Course"
 *         price:
 *           type: number
 *           description: The price of the menu item
 *           example: 12.99
 *         available:
 *           type: boolean
 *           description: Whether the menu item is currently available
 *           example: true
 *
 *     UpdateMenu:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the menu item
 *           example: "Veggie Burger Deluxe"
 *         category:
 *           type: string
 *           description: The category of the menu item
 *           example: "Main Course"
 *         price:
 *           type: number
 *           description: The price of the menu item
 *           example: 14.99
 *         available:
 *           type: boolean
 *           description: Whether the menu item is currently available
 *           example: false
 */


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
