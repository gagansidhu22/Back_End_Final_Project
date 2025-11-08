export interface User {
  id: string;              // Firestore document ID
  name: string;
  email: string;
  role: "admin" | "staff" | "customer";  // Role-based access
  createdAt?: string;      // Optional timestamp
}
