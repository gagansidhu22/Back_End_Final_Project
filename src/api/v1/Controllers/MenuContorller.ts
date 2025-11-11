// import statements
import { Request, Response } from "express";
import * as menuService from "../services/MenuService";

export const createMenu = async (req: Request, res: Response) => {
  try {
    const id = await menuService.createMenu(req.body);
    res.status(201).json({ id });
  } catch (err: any) {
    res.status(500).json({ message: "Failed to create menu", error: err.message });
  }
};

export const getMenus = async (_req: Request, res: Response) => {
  try {
    const menus = await menuService.getMenus();
    res.json(menus);
  } catch (err: any) {
    res.status(500).json({ message: "Failed to fetch menus", error: err.message });
  }
};

export const updateMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedMenu = await menuService.updateMenu(id, req.body);
    if (!updatedMenu) return res.status(404).json({ message: "Menu not found" });
    res.json(updatedMenu);
  } catch (err: any) {
    res.status(500).json({ message: "Failed to update menu", error: err.message });
  }
};

export const deleteMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await menuService.deleteMenu(id);
    if (!success) return res.status(404).json({ message: "Menu not found" });
    res.json({ message: "Menu deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: "Failed to delete menu", error: err.message });
  }
};