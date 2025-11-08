import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../Repositories/firebaseRepository";

const COLLECTION = "menus";

// 🧩 Create Menu
export const createMenu = async (data: any): Promise<string> => {
  return await createDocument(COLLECTION, data);
};

// 🧩 Get All Menus
export const getMenus = async (): Promise<any[]> => {
  const snapshot = await getDocuments(COLLECTION);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// 🧩 Get Menu by ID
export const getMenuById = async (id: string): Promise<any | null> => {
  const doc = await getDocumentById(COLLECTION, id);
  return doc ? { id: doc.id, ...doc.data() } : null;
};

// 🧩 Update Menu
export const updateMenu = async (id: string, updates: any): Promise<any | null> => {
  const doc = await getDocumentById(COLLECTION, id);
  if (!doc) return null;

  await updateDocument(COLLECTION, id, updates);
  const updatedDoc = await getDocumentById(COLLECTION, id);
  return updatedDoc ? { id: updatedDoc.id, ...updatedDoc.data() } : null;
};

// 🧩 Delete Menu
export const deleteMenu = async (id: string): Promise<boolean> => {
  const doc = await getDocumentById(COLLECTION, id);
  if (!doc) return false;

  await deleteDocument(COLLECTION, id);
  return true;
};
