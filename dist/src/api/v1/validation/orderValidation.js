"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderSchema = exports.createOrderSchema = void 0;
const joi_1 = __importDefault(require("joi"));
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
exports.createOrderSchema = joi_1.default.object({
    userId: joi_1.default.string().required(),
    items: joi_1.default.array().items(joi_1.default.string().required()).min(1).required(),
    totalAmount: joi_1.default.number().min(0).required(),
    status: joi_1.default.string()
        .valid("pending", "preparing", "ready", "completed")
        .default("pending"),
});
exports.updateOrderSchema = joi_1.default.object({
    status: joi_1.default.string().valid("pending", "preparing", "ready", "completed"),
});
