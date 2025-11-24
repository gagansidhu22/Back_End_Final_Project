export interface AuthorizationOptions {
  hasRole: Array<"admin" | "manager" | "user" | "cashier">;
  allowSameUser?: boolean;
}
