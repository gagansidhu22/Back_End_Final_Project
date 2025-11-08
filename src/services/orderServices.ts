import { Order, orders } from "../data/orders";

let nextId = orders.length + 1;

export const getOrders = (): Order[] => orders;

export const getOrderById = (id: number): Order | undefined =>
  orders.find(o => o.id === id);

export const createOrder = (data: Omit<Order, "id">): Order => {
  const newOrder = { id: nextId++, ...data };
  orders.push(newOrder);
  return newOrder;
};

export const updateOrder = (id: number, updates: Partial<Omit<Order, "id">>): Order | null => {
  const index = orders.findIndex(o => o.id === id);
  if (index === -1) return null;
  orders[index] = { ...orders[index], ...updates };
  return orders[index];
};

export const deleteOrder = (id: number): boolean => {
  const index = orders.findIndex(o => o.id === id);
  if (index === -1) return false;
  orders.splice(index, 1);
  return true;
};
