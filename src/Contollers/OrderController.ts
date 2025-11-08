import { Response } from 'express';
import { Order, User } from '../models';
import { AuthRequest } from '../middlewares/auth';

export const createOrder = async (req: AuthRequest, res: Response) => {
  let localUser = await User.findOne({ where: { uid: req.uid } });
  if (!localUser) localUser = await User.create({ uid: req.uid!, role: 'customer' });
  const order = await Order.create({ userId: localUser.id, status: 'pending' });
  res.status(201).json(order);
};

export const updateOrderStatus = async (req: any, res: Response) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  order.status = req.body.status || order.status;
  await order.save();
  res.json(order);
};

export const getMyOrders = async (req: AuthRequest, res: Response) => {
  const localUser = await User.findOne({ where: { uid: req.uid } });
  if (!localUser) return res.json([]);
  const orders = await Order.findAll({ where: { userId: localUser.id } });
  res.json(orders);
};
