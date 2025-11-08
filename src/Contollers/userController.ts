import { Response } from 'express';
import { User } from '../models';
import { AuthRequest } from '../middlewares/auth';

export const createOrGetUser = async (req: AuthRequest, res: Response) => {
  const uid = req.uid!;
  const role = req.body.role || 'customer';
  const [user] = await User.findOrCreate({ where: { uid }, defaults: { role } });
  res.json(user);
};

export const getAllUsers = async (req: any, res: Response) => {
  const users = await User.findAll();
  res.json(users);
};
import { Request, Response } from "express";
import * as userService from "../services/userService";

export const getUsers = (req: Request, res: Response) =>
  res.json(userService.getUsers());

export const getUserById = (req: Request, res: Response) => {
  const user = userService.getUserById(Number(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const createUser = (req: Request, res: Response) => {
  const newUser = userService.createUser(req.body);
  res.status(201).json(newUser);
};

export const updateUser = (req: Request, res: Response) => {
  const updated = userService.updateUser(Number(req.params.id), req.body);
  if (!updated) return res.status(404).json({ message: "User not found" });
  res.json(updated);
};

export const deleteUser = (req: Request, res: Response) => {
  const deleted = userService.deleteUser(Number(req.params.id));
  if (!deleted) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted successfully" });
};
