"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMenuSchema = exports.createMenuSchema = void 0;
const joi_1 = __importDefault(require("joi"));
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
exports.createMenuSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(100).required(),
    category: joi_1.default.string().min(2).max(50).required(),
    price: joi_1.default.number().min(0).required(),
    available: joi_1.default.boolean().required(),
});
exports.updateMenuSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(100),
    category: joi_1.default.string().min(2).max(50),
    price: joi_1.default.number().min(0),
    available: joi_1.default.boolean(),
});
