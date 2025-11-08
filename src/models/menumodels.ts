export interface Menu {
  id: string;              // Firestore document ID
  name: string;            // e.g., "Cheeseburger"
  category: string;        // e.g., "Main Course", "Beverage"
  price: number;
  available: boolean;      // Whether item is available or sold out
  createdAt?: string;
}
