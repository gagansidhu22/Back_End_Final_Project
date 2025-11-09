import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../Repositories/firebaseRepository";

export interface User {
  id?: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  createdAt?: string;
}

const COLLECTION = "users";

export const createUser = async (data: Omit<User, "id">): Promise<User> => {
  const id = await createDocument<User>(COLLECTION, data);
  return { id, ...data };
};

export const getUsers = async (): Promise<User[]> => {
  const snapshot = await getDocuments<User>(COLLECTION);
  return snapshot.docs.map((doc) => {
    const data = (doc.data() || {}) as Partial<User>;
    return {
      id: doc.id,
      name: data.name ?? "Unknown",
      email: data.email ?? "unknown@example.com",
      role: (data.role as User["role"]) ?? "customer",
    };
  });
};

export const getUserById = async (id: string): Promise<User | null> => {
  const doc = await getDocumentById<User>(COLLECTION, id);
  if (!doc || !doc.exists) return null;
  const data = (doc.data() || {}) as Partial<User>;
  return {
    id: doc.id,
    name: data.name ?? "Unknown",
    email: data.email ?? "unknown@example.com",
    role: (data.role as User["role"]) ?? "customer",
  };
};

export const updateUser = async (id: string, updates: Partial<User>): Promise<User | null> => {
  await updateDocument<User>(COLLECTION, id, updates);
  const updatedDoc = await getDocumentById<User>(COLLECTION, id);
  if (!updatedDoc || !updatedDoc.exists) return null;
  const data = (updatedDoc.data() || {}) as Partial<User>;
  return {
    id: updatedDoc.id,
    name: data.name ?? "Unknown",
    email: data.email ?? "unknown@example.com",
    role: (data.role as User["role"]) ?? "customer",
  };
};

export const deleteUser = async (id: string): Promise<boolean> => {
  await deleteDocument(COLLECTION, id);
  return true;
};
