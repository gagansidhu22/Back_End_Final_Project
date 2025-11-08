import * as userService from "../Contollers/userController";
import { Request, Response } from "express";

// Create User
export const createUser = async (req: Request, res: Response) => {
  try {
    const id = await userService.createUser(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ message: "Failed to create user", error: (err as Error).message });
  }
};

// Get All Users
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: (err as Error).message });
  }
};

// Update User
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedUser = await userService.updateUser(id, req.body);
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(updatedUser);
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update user", error: (err as Error).message });
  }
};

// Delete User
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await userService.deleteUser(id);
    if (success) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user", error: (err as Error).message });
  }
};
