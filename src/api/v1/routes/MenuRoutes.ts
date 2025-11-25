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
 *   get:
 *     summary: Retrieve a list of menu items
 *     tags: [Menus]
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
 *         description: Maximum number of menu items to return
 *       - name: category
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter menu items by category
 *     responses:
 *       '200':
 *         description: Successfully retrieved menu items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 menus:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Menu'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 */
router.get(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["admin", "manager", "user"] }),
  getMenus
);

/**
 * @openapi
 * /menus:
 *   post:
 *     summary: Create a new menu item
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMenu'
 *     responses:
 *       '201':
 *         description: Menu item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       '400':
 *         description: Invalid input data
 *       '403':
 *         description: Not authorized to create menu items
 */
router.post(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["admin", "manager"] }),
  validateRequest(schema.createMenuSchema),
  createMenu
);

/**
 * @openapi
 * /menus/{id}:
 *   put:
 *     summary: Update a specific menu item
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the menu item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMenu'
 *     responses:
 *       '200':
 *         description: Menu item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       '400':
 *         description: Invalid input data
 *       '403':
 *         description: Not authorized to update this menu item
 *       '404':
 *         description: Menu item not found
 */
router.put(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin", "manager"] }),
  validateRequest(schema.updateMenuSchema),
  updateMenu
);

/**
 * @openapi
 * /menus/{id}:
 *   delete:
 *     summary: Delete a specific menu item
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the menu item
 *     responses:
 *       '200':
 *         description: Menu item deleted successfully
 *       '403':
 *         description: Not authorized to delete this menu item
 *       '404':
 *         description: Menu item not found
 */
router.delete(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  deleteMenu
);

export default router;
