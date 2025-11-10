"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenu = exports.updateMenu = exports.getMenuById = exports.getMenus = exports.createMenu = void 0;
const firebaseRepository_1 = require("../Repositories/firebaseRepository");
const COLLECTION = "menus";
// Create a new menu
const createMenu = async (data) => {
    try {
        if (!data.name || data.price === undefined || !data.category) {
            throw new Error("Missing required menu fields");
        }
        const id = await (0, firebaseRepository_1.createDocument)(COLLECTION, data);
        const newMenu = {
            ...data,
            id, // keep as string
        };
        return newMenu;
    }
    catch (error) {
        console.error("Error creating menu:", error);
        throw new Error("Failed to create menu");
    }
};
exports.createMenu = createMenu;
// Get all menus
const getMenus = async () => {
    try {
        const snapshot = await (0, firebaseRepository_1.getDocuments)(COLLECTION);
        return snapshot.docs.map((doc) => {
            const data = doc.data();
            if (!data.name || data.price === undefined || !data.category) {
                throw new Error(`Invalid menu data in document ${doc.id}`);
            }
            return {
                ...data,
                id: doc.id, // keep as string
            };
        });
    }
    catch (error) {
        console.error("Error fetching menus:", error);
        throw new Error("Failed to fetch menus");
    }
};
exports.getMenus = getMenus;
// Get menu by ID
const getMenuById = async (id) => {
    try {
        const doc = await (0, firebaseRepository_1.getDocumentById)(COLLECTION, id);
        if (!doc || !doc.exists)
            return null;
        const data = doc.data();
        if (!data.name || data.price === undefined || !data.category) {
            throw new Error(`Invalid menu data in document ${doc.id}`);
        }
        return {
            ...data,
            id: doc.id, // keep as string
        };
    }
    catch (error) {
        console.error("Error fetching menu:", error);
        throw new Error("Failed to fetch menu");
    }
};
exports.getMenuById = getMenuById;
// Update menu
const updateMenu = async (id, updates) => {
    try {
        if (!updates || Object.keys(updates).length === 0) {
            throw new Error("No fields provided for update");
        }
        await (0, firebaseRepository_1.updateDocument)(COLLECTION, id, updates);
        const updatedDoc = await (0, firebaseRepository_1.getDocumentById)(COLLECTION, id);
        if (!updatedDoc || !updatedDoc.exists)
            return null;
        const updatedData = updatedDoc.data();
        if (!updatedData.name || updatedData.price === undefined || !updatedData.category) {
            throw new Error(`Invalid menu data in document ${updatedDoc.id}`);
        }
        return {
            ...updatedData,
            id: updatedDoc.id, // keep as string
        };
    }
    catch (error) {
        console.error("Error updating menu:", error);
        throw new Error("Failed to update menu");
    }
};
exports.updateMenu = updateMenu;
// Delete menu
const deleteMenu = async (id) => {
    try {
        await (0, firebaseRepository_1.deleteDocument)(COLLECTION, id);
        return true;
    }
    catch (error) {
        console.error("Error deleting menu:", error);
        throw new Error("Failed to delete menu");
    }
};
exports.deleteMenu = deleteMenu;
