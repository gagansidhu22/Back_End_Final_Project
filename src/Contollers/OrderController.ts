import { Request, Response } from "express";
import * as orderService from "../services/orderServices";

export const getOrders = (req: Request, res: Response) => {
  const allOrders = orderService.getOrders();
  res.json(allOrders);
};

export const getOrderById = (req: Request, res: Response) => {
  const order = orderService.getOrderById(Number(req.params.id));
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
};

export const createOrder = (req: Request, res: Response) => {
  const newOrder = orderService.createOrder(req.body);
  res.status(201).json(newOrder);
};

export const updateOrder = (req: Request, res: Response) => {
  const updated = orderService.updateOrder(Number(req.params.id), req.body);
  if (!updated) return res.status(404).json({ message: "Order not found" });
  res.json(updated);
};

export const deleteOrder = (req: Request, res: Response) => {
  const deleted = orderService.deleteOrder(Number(req.params.id));
  if (!deleted) return res.status(404).json({ message: "Order not found" });
  res.json({ message: "Order deleted successfully" });
};
