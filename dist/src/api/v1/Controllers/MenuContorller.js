"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenu = exports.updateMenu = exports.getMenus = exports.createMenu = void 0;
const menuService = __importStar(require("../services/MenuService"));
const createMenu = async (req, res) => {
    try {
        const id = await menuService.createMenu(req.body);
        res.status(201).json({ id });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to create menu", error: err.message });
    }
};
exports.createMenu = createMenu;
const getMenus = async (_req, res) => {
    try {
        const menus = await menuService.getMenus();
        res.json(menus);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch menus", error: err.message });
    }
};
exports.getMenus = getMenus;
const updateMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMenu = await menuService.updateMenu(id, req.body);
        if (!updatedMenu)
            return res.status(404).json({ message: "Menu not found" });
        res.json(updatedMenu);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update menu", error: err.message });
    }
};
exports.updateMenu = updateMenu;
const deleteMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await menuService.deleteMenu(id);
        if (!success)
            return res.status(404).json({ message: "Menu not found" });
        res.json({ message: "Menu deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to delete menu", error: err.message });
    }
};
exports.deleteMenu = deleteMenu;
