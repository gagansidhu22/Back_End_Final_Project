import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../Repositories/firebaseRepository";

const COLLECTION = "users";

// Create User
export const createUser = async (data: any): Promise<string> => {
  return await createDocument(COLLECTION, data);
};

// Get All Users
export const getUsers = async (): Promise<any[]> => {
  const snapshot = await getDocuments(COLLECTION);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Get User by ID
export const getUserById = async (id: string): Promise<any | null> => {
  const doc = await getDocumentById(COLLECTION, id);
  return doc ? { id: doc.id, ...doc.data() } : null;
};

// Update User
export const updateUser = async (id: string, updates: any): Promise<any | null> => {
  const doc = await getDocumentById(COLLECTION, id);
  if (!doc) return null;

  await updateDocument(COLLECTION, id, updates);
  const updatedDoc = await getDocumentById(COLLECTION, id);
  return updatedDoc ? { id: updatedDoc.id, ...updatedDoc.data() } : null;
};

// Delete User
export const deleteUser = async (id: string): Promise<boolean> => {
  const doc = await getDocumentById(COLLECTION, id);
  if (!doc) return false;

  await deleteDocument(COLLECTION, id);
  return true;
};
