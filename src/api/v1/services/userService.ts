import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../Repositories/firebaseRepository";

const COLLECTION = "users";

// Define User Type
export interface User {
  id?: number;
  name: string;
  email: string;
  role: "customer" | "admin";
  createdAt?: string;
}

// Create a new user
export const createUser = async (data: Omit<User, "id">): Promise<User> => {
  try {
    if (!data.name || !data.email || !data.role) {
      throw new Error("Missing required user fields");
    }

    const id = await createDocument<User>(COLLECTION, data);
    const newUser: User = {
      ...data,
      id: Number.isNaN(Number(id)) ? 0 : Number(id),
    };
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
};

// Get all users
export const getUsers = async (): Promise<User[]> => {
  try {
    const snapshot = await getDocuments<User>(COLLECTION);
    return snapshot.docs.map((doc) => {
      const data = doc.data() as Omit<User, "id">;
      if (!data.name || !data.email || !data.role) {
        throw new Error(`Invalid user data in document ${doc.id}`);
      }
      return {
        ...data,
        id: Number.isNaN(Number(doc.id)) ? 0 : Number(doc.id),
      };
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

// Get user by ID
export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const doc = await getDocumentById<User>(COLLECTION, id);
    if (!doc || !doc.exists) return null;

    const data = doc.data() as Omit<User, "id">;
    if (!data.name || !data.email || !data.role) {
      throw new Error(`Invalid user data in document ${doc.id}`);
    }

    return {
      ...data,
      id: Number.isNaN(Number(doc.id)) ? 0 : Number(doc.id),
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
};

// Update user
export const updateUser = async (
  id: string,
  updates: Partial<Omit<User, "id">>
): Promise<User | null> => {
  try {
    if (!updates || Object.keys(updates).length === 0) {
      throw new Error("No fields provided for update");
    }

    await updateDocument<User>(COLLECTION, id, updates);
    const updatedDoc = await getDocumentById<User>(COLLECTION, id);
    if (!updatedDoc || !updatedDoc.exists) return null;

    const updatedData = updatedDoc.data() as Omit<User, "id">;
    if (!updatedData.name || !updatedData.email || !updatedData.role) {
      throw new Error(`Invalid user data in document ${updatedDoc.id}`);
    }

    return {
      ...updatedData,
      id: Number.isNaN(Number(updatedDoc.id)) ? 0 : Number(updatedDoc.id),
    };
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
};

// Delete user
export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    await deleteDocument(COLLECTION, id);
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
};
