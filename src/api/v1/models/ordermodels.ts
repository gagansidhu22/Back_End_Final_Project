export interface Order {
  id: string;               
  userId: string;           
  items: string[];          
  totalAmount: number;      
  status: "pending" | "preparing" | "ready" | "completed";
  createdAt?: string;
}
