import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../Repositories/firebaseRepository";

const COLLECTION = "orders";

// Define Type for Order
export interface Order {
  id?: string;
  userId: string;
  menuId: string;
  quantity: number;
  totalPrice: number;
  status: "pending" | "completed" | "cancelled";
  createdAt?: string;
}

// Create a new order
export const createOrder = async (data: Omit<Order, "id" | "createdAt">): Promise<Order> => {
  try {
    if (!data.userId || !data.menuId || data.quantity === undefined || data.totalPrice === undefined || !data.status) {
      throw new Error("Missing required order fields");
    }

    const id = await createDocument<Order>(COLLECTION, data);
    const newOrder: Order = {
      ...data,
      id, 
      createdAt: new Date().toISOString(), 
    };
    return newOrder;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Get all orders
export const getOrders = async (): Promise<Order[]> => {
  try {
    const snapshot = await getDocuments<Order>(COLLECTION);
    return snapshot.docs.map((doc) => {
      const data = doc.data() as Omit<Order, "id">;
      if (!data.userId || !data.menuId || data.quantity === undefined || data.totalPrice === undefined || !data.status) {
        throw new Error(`Invalid order data in document ${doc.id}`);
      }
      return {
        ...data,
        id: doc.id, 
      };
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
};

// Get order by ID
export const getOrderById = async (id: string): Promise<Order | null> => {
  try {
    const doc = await getDocumentById<Order>(COLLECTION, id);
    if (!doc || !doc.exists) return null;

    const data = doc.data() as Omit<Order, "id">;
    if (!data.userId || !data.menuId || data.quantity === undefined || data.totalPrice === undefined || !data.status) {
      throw new Error(`Invalid order data in document ${doc.id}`);
    }

    return {
      ...data,
      id: doc.id, 
    };
  } catch (error) {
    console.error("Error fetching order:", error);
    throw new Error("Failed to fetch order");
  }
};

// Update order
export const updateOrder = async (
  id: string,
  updates: Partial<Omit<Order, "id">>
): Promise<Order | null> => {
  try {
    if (!updates || Object.keys(updates).length === 0) {
      throw new Error("No fields provided for update");
    }

    await updateDocument<Order>(COLLECTION, id, updates);
    const updatedDoc = await getDocumentById<Order>(COLLECTION, id);
    if (!updatedDoc || !updatedDoc.exists) return null;

    const updatedData = updatedDoc.data() as Omit<Order, "id">;
    if (!updatedData.userId || !updatedData.menuId || updatedData.quantity === undefined || updatedData.totalPrice === undefined || !updatedData.status) {
      throw new Error(`Invalid order data in document ${updatedDoc.id}`);
    }

    return {
      ...updatedData,
      id: updatedDoc.id, 
    };
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

// Delete order
export const deleteOrder = async (id: string): Promise<boolean> => {
  try {
    await deleteDocument(COLLECTION, id);
    return true;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw new Error("Failed to delete order");
  }
};