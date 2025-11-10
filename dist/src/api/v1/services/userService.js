"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const firebaseRepository_1 = require("../Repositories/firebaseRepository");
const COLLECTION = "users";
const createUser = async (data) => {
    const id = await (0, firebaseRepository_1.createDocument)(COLLECTION, data);
    return { id, ...data };
};
exports.createUser = createUser;
const getUsers = async () => {
    const snapshot = await (0, firebaseRepository_1.getDocuments)(COLLECTION);
    return snapshot.docs.map((doc) => {
        const data = (doc.data() || {});
        return {
            id: doc.id,
            name: data.name ?? "Unknown",
            email: data.email ?? "unknown@example.com",
            role: data.role ?? "customer",
        };
    });
};
exports.getUsers = getUsers;
const getUserById = async (id) => {
    const doc = await (0, firebaseRepository_1.getDocumentById)(COLLECTION, id);
    if (!doc || !doc.exists)
        return null;
    const data = (doc.data() || {});
    return {
        id: doc.id,
        name: data.name ?? "Unknown",
        email: data.email ?? "unknown@example.com",
        role: data.role ?? "customer",
    };
};
exports.getUserById = getUserById;
const updateUser = async (id, updates) => {
    await (0, firebaseRepository_1.updateDocument)(COLLECTION, id, updates);
    const updatedDoc = await (0, firebaseRepository_1.getDocumentById)(COLLECTION, id);
    if (!updatedDoc || !updatedDoc.exists)
        return null;
    const data = (updatedDoc.data() || {});
    return {
        id: updatedDoc.id,
        name: data.name ?? "Unknown",
        email: data.email ?? "unknown@example.com",
        role: data.role ?? "customer",
    };
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    await (0, firebaseRepository_1.deleteDocument)(COLLECTION, id);
    return true;
};
exports.deleteUser = deleteUser;
