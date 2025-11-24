import { Router } from "express";
import authenticate from "../Middleware/authentication";
import isAuthorized from "../Middleware/authorize";
import {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder
} from "../Controllers/OrderController";
import { validateRequest } from "../Middleware/requestValidation";
import * as schema from "../validation/orderValidation";

const router = Router();

/**
 * @openapi
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *
 *   get:
 *     summary: Retrieve a list of orders
 *     tags: [Orders]
 *
 * /orders/{id}:
 *   put:
 *     summary: Update a specific order
 *     tags: [Orders]
 *
 *   delete:
 *     summary: Delete a specific order
 *     tags: [Orders]
 */

// Create order — allowed for user (customer)
router.post(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["user"] }),
  validateRequest(schema.createOrderSchema),
  createOrder
);

// Get all orders — allowed for admin, manager, cashier
router.get(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["admin", "manager", "cashier"] }),
  getOrders
);

// Update order — manager or cashier
router.put(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["manager", "cashier"] }),
  validateRequest(schema.updateOrderSchema),
  updateOrder
);

// Delete order — admin only
router.delete(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  deleteOrder
);

export default router;
