// src/controllers/orderController.ts
import { Request, Response } from "express";
import * as orderService from "../services/orderServices";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const id = await orderService.createOrder(req.body);
    res.status(201).json({ id });
  } catch (err: any) {
    res.status(500).json({ message: "Failed to create order", error: err.message });
  }
};

export const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await orderService.getOrders();
    res.json(orders);
  } catch (err: any) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedOrder = await orderService.updateOrder(id, req.body);
    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
    res.json(updatedOrder);
  } catch (err: any) {
    res.status(500).json({ message: "Failed to update order", error: err.message });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await orderService.deleteOrder(id);
    if (!success) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: "Failed to delete order", error: err.message });
  }
};
