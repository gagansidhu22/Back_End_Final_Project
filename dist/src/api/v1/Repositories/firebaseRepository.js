"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocument = exports.updateDocument = exports.getDocumentById = exports.getDocuments = exports.createDocument = void 0;
const firebaseConfig_1 = require("../../../../config/firebaseConfig");
/**
 * Creates a new document in the specified Firestore collection.
 */
const createDocument = async (collectionName, data, id) => {
    try {
        let docRef;
        if (id) {
            docRef = firebaseConfig_1.db.collection(collectionName).doc(id);
            await docRef.set(data);
        }
        else {
            docRef = await firebaseConfig_1.db.collection(collectionName).add(data);
        }
        return docRef.id;
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to create document in ${collectionName}: ${errorMessage}`);
    }
};
exports.createDocument = createDocument;
/**
 * Retrieves all documents from a specified Firestore collection.
 */
const getDocuments = async (collectionName) => {
    try {
        return (await firebaseConfig_1.db.collection(collectionName).get());
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to fetch documents from ${collectionName}: ${errorMessage}`);
    }
};
exports.getDocuments = getDocuments;
/**
 * Retrieves a document by its ID from a Firestore collection.
 */
const getDocumentById = async (collectionName, id) => {
    try {
        const doc = (await firebaseConfig_1.db.collection(collectionName).doc(id).get());
        return doc.exists ? doc : null;
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to fetch document ${id} from ${collectionName}: ${errorMessage}`);
    }
};
exports.getDocumentById = getDocumentById;
/**
 * Updates an existing document in a Firestore collection.
 */
const updateDocument = async (collectionName, id, data) => {
    try {
        await firebaseConfig_1.db.collection(collectionName).doc(id).update(data);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to update document ${id} in ${collectionName}: ${errorMessage}`);
    }
};
exports.updateDocument = updateDocument;
/**
 * Deletes a document from a Firestore collection.
 */
const deleteDocument = async (collectionName, id, transaction) => {
    try {
        const docRef = firebaseConfig_1.db.collection(collectionName).doc(id);
        if (transaction) {
            transaction.delete(docRef);
        }
        else {
            await docRef.delete();
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to delete document ${id} from ${collectionName}: ${errorMessage}`);
    }
};
exports.deleteDocument = deleteDocument;
