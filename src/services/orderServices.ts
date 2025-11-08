import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../Repositories/firebaseRepository";

const COLLECTION = "orders";

// Create Order
export const createOrder = async (data: any): Promise<string> => {
  return await createDocument(COLLECTION, data);
};

// Get All Orders
export const getOrders = async (): Promise<any[]> => {
  const snapshot = await getDocuments(COLLECTION);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Get Order by ID
export const getOrderById = async (id: string): Promise<any | null> => {
  const doc = await getDocumentById(COLLECTION, id);
  return doc ? { id: doc.id, ...doc.data() } : null;
};

// Update Order
export const updateOrder = async (id: string, updates: any): Promise<any | null> => {
  const doc = await getDocumentById(COLLECTION, id);
  if (!doc) return null;

  await updateDocument(COLLECTION, id, updates);
  const updatedDoc = await getDocumentById(COLLECTION, id);
  return updatedDoc ? { id: updatedDoc.id, ...updatedDoc.data() } : null;
};

// Delete Order
export const deleteOrder = async (id: string): Promise<boolean> => {
  const doc = await getDocumentById(COLLECTION, id);
  if (!doc) return false;

  await deleteDocument(COLLECTION, id);
  return true;
};
