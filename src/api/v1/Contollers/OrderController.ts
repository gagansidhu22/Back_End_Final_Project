import * as orderService from "../services/orderServices";
import { Request, Response } from "express";

// Create Order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const id = await orderService.createOrder(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ message: "Failed to create order", error: (err as Error).message });
  }
};

// Get All Orders
export const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await orderService.getOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: (err as Error).message });
  }
};

// Update Order
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedOrder = await orderService.updateOrder(id, req.body);
    if (!updatedOrder) {
      res.status(404).json({ message: "Order not found" });
    } else {
      res.json(updatedOrder);
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update order", error: (err as Error).message });
  }
};

// Delete Order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await orderService.deleteOrder(id);
    if (success) {
      res.json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to delete order", error: (err as Error).message });
  }
};
