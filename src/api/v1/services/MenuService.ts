import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../Repositories/firebaseRepository";

const COLLECTION = "menus";

// Define the Menu type
export interface Menu {
  id?: string;
  name: string;
  price: number;
  category: string;
  description?: string;
}

// Create a new menu
export const createMenu = async (data: Omit<Menu, "id">): Promise<Menu> => {
  try {
    if (!data.name || data.price === undefined || !data.category) {
      throw new Error("Missing required menu fields");
    }

    const id = await createDocument<Menu>(COLLECTION, data);
    const newMenu: Menu = {
      ...data,
      id, // keep as string
    };
    return newMenu;
  } catch (error) {
    console.error("Error creating menu:", error);
    throw new Error("Failed to create menu");
  }
};

// Get all menus
export const getMenus = async (): Promise<Menu[]> => {
  try {
    const snapshot = await getDocuments<Menu>(COLLECTION);
    return snapshot.docs.map((doc) => {
      const data = doc.data() as Omit<Menu, "id">;
      if (!data.name || data.price === undefined || !data.category) {
        throw new Error(`Invalid menu data in document ${doc.id}`);
      }
      return {
        ...data,
        id: doc.id, // keep as string
      };
    });
  } catch (error) {
    console.error("Error fetching menus:", error);
    throw new Error("Failed to fetch menus");
  }
};

// Get menu by ID
export const getMenuById = async (id: string): Promise<Menu | null> => {
  try {
    const doc = await getDocumentById<Menu>(COLLECTION, id);
    if (!doc || !doc.exists) return null;

    const data = doc.data() as Omit<Menu, "id">;
    if (!data.name || data.price === undefined || !data.category) {
      throw new Error(`Invalid menu data in document ${doc.id}`);
    }

    return {
      ...data,
      id: doc.id, // keep as string
    };
  } catch (error) {
    console.error("Error fetching menu:", error);
    throw new Error("Failed to fetch menu");
  }
};

// Update menu
export const updateMenu = async (
  id: string,
  updates: Partial<Omit<Menu, "id">>
): Promise<Menu | null> => {
  try {
    if (!updates || Object.keys(updates).length === 0) {
      throw new Error("No fields provided for update");
    }

    await updateDocument<Menu>(COLLECTION, id, updates);
    const updatedDoc = await getDocumentById<Menu>(COLLECTION, id);
    if (!updatedDoc || !updatedDoc.exists) return null;

    const updatedData = updatedDoc.data() as Omit<Menu, "id">;
    if (!updatedData.name || updatedData.price === undefined || !updatedData.category) {
      throw new Error(`Invalid menu data in document ${updatedDoc.id}`);
    }

    return {
      ...updatedData,
      id: updatedDoc.id, // keep as string
    };
  } catch (error) {
    console.error("Error updating menu:", error);
    throw new Error("Failed to update menu");
  }
};

// Delete menu
export const deleteMenu = async (id: string): Promise<boolean> => {
  try {
    await deleteDocument(COLLECTION, id);
    return true;
  } catch (error) {
    console.error("Error deleting menu:", error);
    throw new Error("Failed to delete menu");
  }
};