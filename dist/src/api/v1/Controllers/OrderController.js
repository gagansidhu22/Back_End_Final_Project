"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.getOrders = exports.createOrder = void 0;
const orderService = __importStar(require("../services/orderServices"));
const createOrder = async (req, res) => {
    try {
        const id = await orderService.createOrder(req.body);
        res.status(201).json({ id });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to create order", error: err.message });
    }
};
exports.createOrder = createOrder;
const getOrders = async (_req, res) => {
    try {
        const orders = await orderService.getOrders();
        res.json(orders);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch orders", error: err.message });
    }
};
exports.getOrders = getOrders;
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedOrder = await orderService.updateOrder(id, req.body);
        if (!updatedOrder)
            return res.status(404).json({ message: "Order not found" });
        res.json(updatedOrder);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update order", error: err.message });
    }
};
exports.updateOrder = updateOrder;
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await orderService.deleteOrder(id);
        if (!success)
            return res.status(404).json({ message: "Order not found" });
        res.json({ message: "Order deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to delete order", error: err.message });
    }
};
exports.deleteOrder = deleteOrder;
