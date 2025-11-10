"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MenuContorller_1 = require("../Controllers/MenuContorller");
const router = express_1.default.Router();
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateMenu'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   get:
 *     summary: Retrieve a list of menu items
 *     tags: [Menus]
 *     responses:
 *       200:
 *         description: List of menu items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 menus:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CreateMenu'
 *                 total:
 *                   type: integer
 *
 * /menus/{id}:
 *   put:
 *     summary: Update a specific menu item
 *     tags: [Menus]
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
 *       200:
 *         description: Menu item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateMenu'
 *       404:
 *         description: Menu item not found
 *
 *   delete:
 *     summary: Delete a specific menu item
 *     tags: [Menus]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the menu item
 *     responses:
 *       200:
 *         description: Menu item deleted successfully
 *       404:
 *         description: Menu item not found
 */
router.post("/", MenuContorller_1.createMenu);
router.get("/", MenuContorller_1.getMenus);
router.put("/:id", MenuContorller_1.updateMenu);
router.delete("/:id", MenuContorller_1.deleteMenu);
exports.default = router;
