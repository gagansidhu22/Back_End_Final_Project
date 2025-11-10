"use strict";
jest.mock("../config/firebaseConfig", () => ({
    auth: {
        verifyIdToken: jest.fn(),
        getUser: jest.fn(),
    },
    db: {
        collection: jest.fn(() => ({
            doc: jest.fn((id) => ({
                get: jest.fn(() => Promise.resolve({
                    exists: true,
                    id: id || "mock-id",
                    data: () => ({
                        id: id || "mock-id",
                        name: "Mock User",
                        email: "mock@example.com",
                    }),
                })),
                set: jest.fn(() => Promise.resolve()),
                update: jest.fn(() => Promise.resolve({ id: id || "mock-id", name: "Updated Name" })),
                delete: jest.fn(() => Promise.resolve()),
            })),
            add: jest.fn((data) => Promise.resolve({ id: "mock-id", ...data })),
            get: jest.fn(() => Promise.resolve({
                docs: [
                    {
                        id: "mock-id",
                        data: () => ({ name: "Mock User", email: "mock@example.com" }),
                    },
                ],
            })),
        })),
        runTransaction: jest.fn(),
        batch: jest.fn(),
    },
}));
