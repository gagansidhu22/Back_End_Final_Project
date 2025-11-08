export interface Order {
  id: string;               // Firestore document ID
  userId: string;           // Reference to User
  items: string[];          // Array of Menu item IDs
  totalAmount: number;      // Calculated total
  status: "pending" | "preparing" | "ready" | "completed";
  createdAt?: string;
}
