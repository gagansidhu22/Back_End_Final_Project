import * as menuService from "../services/MenuService";
import { Request, Response } from "express";

// Create Menu
export const createMenu = async (req: Request, res: Response) => {
  try {
    const id = await menuService.createMenu(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ message: "Failed to create menu", error: (err as Error).message });
  }
};

// Get All Menus
export const getMenus = async (_req: Request, res: Response) => {
  try {
    const menus = await menuService.getMenus();
    res.json(menus);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch menus", error: (err as Error).message });
  }
};

// Update Menu
export const updateMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedMenu = await menuService.updateMenu(id, req.body);
    if (!updatedMenu) {
      res.status(404).json({ message: "Menu not found" });
    } else {
      res.json(updatedMenu);
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update menu", error: (err as Error).message });
  }
};

// Delete Menu
export const deleteMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await menuService.deleteMenu(id);
    if (success) {
      res.json({ message: "Menu deleted successfully" });
    } else {
      res.status(404).json({ message: "Menu not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to delete menu", error: (err as Error).message });
  }
};
