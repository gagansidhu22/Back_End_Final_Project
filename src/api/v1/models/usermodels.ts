export interface User {
  id: string;              
  name: string;
  email: string;
  role: "admin" | "staff" | "customer";  
  createdAt?: string;      
}
