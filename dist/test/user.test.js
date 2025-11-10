"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const server_1 = require("../src/server");
const mockUsers = [];
// 🧩 Mock Firestore Repository
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
        if (!user)
            return false;
        Object.assign(user, updates);
        return true;
    }),
    deleteDocument: jest.fn().mockImplementation(async (_, id) => {
        const index = mockUsers.findIndex((u) => u.id === id);
        if (index === -1)
            return false;
        mockUsers.splice(index, 1);
        return true;
    }),
}));
describe("User API", () => {
    let createdUserId;
    afterAll((done) => {
        server_1.server.close(() => done());
    });
    it("GET /api/users should return all users", async () => {
        const res = await (0, supertest_1.default)(app_1.default).get("/api/users");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    it("POST /api/users should create a new user", async () => {
        const newUser = { name: "Test User", email: "test@example.com", role: "customer" };
        const res = await (0, supertest_1.default)(app_1.default).post("/api/users").send(newUser);
        expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
        createdUserId = res.body.id; // should be "mock-id"
    });
    it("PATCH /api/users/:id should update the user", async () => {
        const updates = { name: "Updated User" };
        const res = await (0, supertest_1.default)(app_1.default).patch(`/api/users/${createdUserId}`).send(updates);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("User updated successfully");
    });
    it("DELETE /api/users/:id should delete the user", async () => {
        const res = await (0, supertest_1.default)(app_1.default).delete(`/api/users/${createdUserId}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: "User deleted successfully" });
    });
});
