import { Router } from "express";
import authenticate from "../Middleware/authentication";
import isAuthorized from "../Middleware/authorize";
import { 
  createMenu, 
  getMenus, 
  updateMenu, 
  deleteMenu 
} from "../Controllers/MenuContorller";
import { validateRequest } from "../Middleware/requestValidation";
import * as schema from "../validation/menuValidation";

const router = Router();

/**
 * @openapi
 * /menus:
 *   post:
 *     summary: Create a new menu item
 *     tags: [Menus]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMenu'
 *     responses:
 *       201:
 *         description: Menu item created successfully
 *
 *   get:
 *     summary: Retrieve a list of menu items
 *     tags: [Menus]
 *     responses:
 *       200:
 *         description: List of menu items retrieved successfully
 *
 * /menus/{id}:
 *   put:
 *     summary: Update a specific menu item
 *     tags: [Menus]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Menu item updated successfully
 *
 *   delete:
 *     summary: Delete a specific menu item
 *     tags: [Menus]
 */
 
// Create menu — allowed for admin or manager
router.post(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["admin", "manager"] }),
  validateRequest(schema.createMenuSchema),
  createMenu
);

// Get all menus — accessible to all authenticated users
router.get(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["admin", "manager", "user"] }),
  getMenus
);

// Update menu — only admin or manager
router.put(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin", "manager"] }),
  validateRequest(schema.updateMenuSchema),
  updateMenu
);

// Delete menu — only admin
router.delete(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  deleteMenu
);

export default router;
