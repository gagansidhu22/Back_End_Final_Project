import { Request, Response } from 'express';
import { Menu } from '../models';

export const getMenus = async (req: Request, res: Response) => {
  const menus = await Menu.findAll({ where: { available: true } });
  res.json(menus);
};

export const createMenu = async (req: Request, res: Response) => {
  const menu = await Menu.create(req.body);
  res.status(201).json(menu);
};

export const updateMenu = async (req: Request, res: Response) => {
  const menu = await Menu.findByPk(req.params.id);
  if (!menu) return res.status(404).json({ message: 'Menu not found' });
  await menu.update(req.body);
  res.json(menu);
};

export const deleteMenu = async (req: Request, res: Response) => {
  const menu = await Menu.findByPk(req.params.id);
  if (!menu) return res.status(404).json({ message: 'Menu not found' });
  await menu.destroy();
  res.status(204).send();
};
