import { User, users } from "../data/users";

let nextId = users.length + 1;

export const getUsers = (): User[] => users;

export const getUserById = (id: number): User | undefined =>
  users.find(u => u.id === id);

export const createUser = (data: Omit<User, "id">): User => {
  const newUser = { id: nextId++, ...data };
  users.push(newUser);
  return newUser;
};

export const updateUser = (id: number, updates: Partial<Omit<User, "id">>): User | null => {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...updates };
  return users[index];
};

export const deleteUser = (id: number): boolean => {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
};
