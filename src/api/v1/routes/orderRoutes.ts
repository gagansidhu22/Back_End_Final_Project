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
 *   get:
 *     summary: Retrieve a list of orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Maximum number of orders to return
 *       - name: status
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: [pending, processing, completed, cancelled]
 *         description: Filter orders by status
 *     responses:
 *       '200':
 *         description: Successfully retrieved orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 */
router.get(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["admin", "manager", "cashier"] }),
  getOrders
);

/**
 * @openapi
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrder'
 *     responses:
 *       '201':
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '400':
 *         description: Invalid input data
 *       '403':
 *         description: Not authorized to create orders
 */
router.post(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["user"] }),
  validateRequest(schema.createOrderSchema),
  createOrder
);

/**
 * @openapi
 * /orders/{id}:
 *   put:
 *     summary: Update a specific order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrder'
 *     responses:
 *       '200':
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '400':
 *         description: Invalid input data
 *       '403':
 *         description: Not authorized to update this order
 *       '404':
 *         description: Order not found
 */
router.put(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["manager", "cashier"] }),
  validateRequest(schema.updateOrderSchema),
  updateOrder
);

/**
 * @openapi
 * /orders/{id}:
 *   delete:
 *     summary: Delete a specific order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the order
 *     responses:
 *       '200':
 *         description: Order deleted successfully
 *       '403':
 *         description: Not authorized to delete this order
 *       '404':
 *         description: Order not found
 */
router.delete(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  deleteOrder
);

export default router;
