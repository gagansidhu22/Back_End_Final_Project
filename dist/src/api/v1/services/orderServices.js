"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.getOrderById = exports.getOrders = exports.createOrder = void 0;
const firebaseRepository_1 = require("../Repositories/firebaseRepository");
const COLLECTION = "orders";
// Create a new order
const createOrder = async (data) => {
    try {
        if (!data.userId || !data.menuId || data.quantity === undefined || data.totalPrice === undefined || !data.status) {
            throw new Error("Missing required order fields");
        }
        const id = await (0, firebaseRepository_1.createDocument)(COLLECTION, data);
        const newOrder = {
            ...data,
            id, // keep as string
            createdAt: new Date().toISOString(), // add createdAt
        };
        return newOrder;
    }
    catch (error) {
        console.error("Error creating order:", error);
        throw new Error("Failed to create order");
    }
};
exports.createOrder = createOrder;
// Get all orders
const getOrders = async () => {
    try {
        const snapshot = await (0, firebaseRepository_1.getDocuments)(COLLECTION);
        return snapshot.docs.map((doc) => {
            const data = doc.data();
            if (!data.userId || !data.menuId || data.quantity === undefined || data.totalPrice === undefined || !data.status) {
                throw new Error(`Invalid order data in document ${doc.id}`);
            }
            return {
                ...data,
                id: doc.id, // keep as string
            };
        });
    }
    catch (error) {
        console.error("Error fetching orders:", error);
        throw new Error("Failed to fetch orders");
    }
};
exports.getOrders = getOrders;
// Get order by ID
const getOrderById = async (id) => {
    try {
        const doc = await (0, firebaseRepository_1.getDocumentById)(COLLECTION, id);
        if (!doc || !doc.exists)
            return null;
        const data = doc.data();
        if (!data.userId || !data.menuId || data.quantity === undefined || data.totalPrice === undefined || !data.status) {
            throw new Error(`Invalid order data in document ${doc.id}`);
        }
        return {
            ...data,
            id: doc.id, // keep as string
        };
    }
    catch (error) {
        console.error("Error fetching order:", error);
        throw new Error("Failed to fetch order");
    }
};
exports.getOrderById = getOrderById;
// Update order
const updateOrder = async (id, updates) => {
    try {
        if (!updates || Object.keys(updates).length === 0) {
            throw new Error("No fields provided for update");
        }
        await (0, firebaseRepository_1.updateDocument)(COLLECTION, id, updates);
        const updatedDoc = await (0, firebaseRepository_1.getDocumentById)(COLLECTION, id);
        if (!updatedDoc || !updatedDoc.exists)
            return null;
        const updatedData = updatedDoc.data();
        if (!updatedData.userId || !updatedData.menuId || updatedData.quantity === undefined || updatedData.totalPrice === undefined || !updatedData.status) {
            throw new Error(`Invalid order data in document ${updatedDoc.id}`);
        }
        return {
            ...updatedData,
            id: updatedDoc.id, // keep as string
        };
    }
    catch (error) {
        console.error("Error updating order:", error);
        throw new Error("Failed to update order");
    }
};
exports.updateOrder = updateOrder;
// Delete order
const deleteOrder = async (id) => {
    try {
        await (0, firebaseRepository_1.deleteDocument)(COLLECTION, id);
        return true;
    }
    catch (error) {
        console.error("Error deleting order:", error);
        throw new Error("Failed to delete order");
    }
};
exports.deleteOrder = deleteOrder;
