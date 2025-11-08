import { Menu, menus } from "../data/menus";

let nextId = menus.length + 1;

export const getMenus = (): Menu[] => menus;

export const getMenuById = (id: number): Menu | undefined =>
  menus.find(m => m.id === id);

export const createMenu = (data: Omit<Menu, "id">): Menu => {
  const newMenu = { id: nextId++, ...data };
  menus.push(newMenu);
  return newMenu;
};

export const updateMenu = (id: number, updates: Partial<Omit<Menu, "id">>): Menu | null => {
  const index = menus.findIndex(m => m.id === id);
  if (index === -1) return null;
  menus[index] = { ...menus[index], ...updates };
  return menus[index];
};

export const deleteMenu = (id: number): boolean => {
  const index = menus.findIndex(m => m.id === id);
  if (index === -1) return false;
  menus.splice(index, 1);
  return true;
};
