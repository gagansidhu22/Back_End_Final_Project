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
