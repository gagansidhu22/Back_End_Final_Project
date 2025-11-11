import request from "supertest";
import app from "../src/app";
import { server } from "../src/server";

const mockUsers: any[] = [];

// Mock Firestore Repository
jest.mock("../src/api/v1/Repositories/firebaseRepository", () => ({
  createDocument: jest.fn().mockImplementation(async (_, data) => {
    const newUser = { id: "mock-id", ...data };
    mockUsers.push(newUser);
    return newUser.id;
  }),

  getDocuments: jest.fn().mockImplementation(async () => ({
    docs: mockUsers.map((u) => ({
      id: u.id,
      data: () => ({ name: u.name, email: u.email, role: u.role }),
    })),
  })),

  getDocumentById: jest.fn().mockImplementation(async (_, id) => {
    const user = mockUsers.find((u) => u.id === id);
    if (user) {
      return { id: user.id, exists: true, data: () => user };
    }
    return { exists: false };
  }),

  updateDocument: jest.fn().mockImplementation(async (_, id, updates) => {
    const user = mockUsers.find((u) => u.id === id);
    if (!user) return false;
    Object.assign(user, updates);
    return true;
  }),

  deleteDocument: jest.fn().mockImplementation(async (_, id) => {
    const index = mockUsers.findIndex((u) => u.id === id);
    if (index === -1) return false;
    mockUsers.splice(index, 1);
    return true;
  }),
}));

describe("User API", () => {
  let createdUserId: string;

  afterAll((done) => {
  server.close(() => done());
});

  it("GET /api/users should return all users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /api/users should create a new user", async () => {
    const newUser = { name: "Test User", email: "test@example.com", role: "customer" };
    const res = await request(app).post("/api/users").send(newUser);

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();

    createdUserId = res.body.id; 
  });

  it("PATCH /api/users/:id should update the user", async () => {
    const updates = { name: "Updated User" };
    const res = await request(app).patch(`/api/users/${createdUserId}`).send(updates);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User updated successfully");
  });

  it("DELETE /api/users/:id should delete the user", async () => {
    const res = await request(app).delete(`/api/users/${createdUserId}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "User deleted successfully" });
  });
});
