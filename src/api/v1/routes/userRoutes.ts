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
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *
 * /users/{id}:
 *   put:
 *     summary: Update a specific user
 *     tags: [Users]
 *
 *   delete:
 *     summary: Delete a specific user
 *     tags: [Users]
 */

// Create user — only admin
router.post(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  validateRequest(schema.createUserSchema),
  createUser
);

// Get all users — admin + manager
router.get(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["admin", "manager"] }),
  getUsers
);

// Update user — admin only
router.put(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  validateRequest(schema.updateUserSchema),
  updateUser
);

// Delete user — admin only
router.delete(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  deleteUser
);

export default router;
