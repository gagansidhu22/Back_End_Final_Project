import { Request, Response } from "express";
import * as menuService from "../services/menuService";

export const getMenus = (req: Request, res: Response) => {
  const allMenus = menuService.getMenus();
  res.json(allMenus);
};

export const getMenuById = (req: Request, res: Response) => {
  const menu = menuService.getMenuById(Number(req.params.id));
  if (!menu) return res.status(404).json({ message: "Menu item not found" });
  res.json(menu);
};

export const createMenu = (req: Request, res: Response) => {
  const newMenu = menuService.createMenu(req.body);
  res.status(201).json(newMenu);
};

export const updateMenu = (req: Request, res: Response) => {
  const updated = menuService.updateMenu(Number(req.params.id), req.body);
  if (!updated) return res.status(404).json({ message: "Menu item not found" });
  res.json(updated);
};

export const deleteMenu = (req: Request, res: Response) => {
  const deleted = menuService.deleteMenu(Number(req.params.id));
  if (!deleted) return res.status(404).json({ message: "Menu item not found" });
  res.json({ message: "Menu deleted successfully" });
};
