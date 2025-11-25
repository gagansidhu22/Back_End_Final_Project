import { Router } from "express";
import authenticate from "../Middleware/authentication";
import isAuthorized from "../Middleware/authorize";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser
} from "../Controllers/userController";
import { validateRequest } from "../Middleware/requestValidation";
import * as schema from "../validation/userValidation";

const router = Router();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
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
 *         description: Maximum number of users to return
 *       - name: role
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: [admin, manager, user]
 *         description: Filter users by role
 *     responses:
 *       '200':
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 */
router.get(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["admin", "manager"] }),
  getUsers
);

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid input data
 *       '403':
 *         description: Not authorized to create users
 *       '409':
 *         description: User with this email already exists
 */
router.post(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  validateRequest(schema.createUserSchema),
  createUser
);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Update a specific user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid input data
 *       '403':
 *         description: Not authorized to update this user
 *       '404':
 *         description: User not found
 */
router.put(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  validateRequest(schema.updateUserSchema),
  updateUser
);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete a specific user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '403':
 *         description: Not authorized to delete this user
 *       '404':
 *         description: User not found
 */
router.delete(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  deleteUser
);

export default router;
