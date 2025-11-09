// ✅ Mock the Firebase config used in your project
jest.mock("../config/firebaseConfig", () => ({
  auth: {
    verifyIdToken: jest.fn(),
    getUser: jest.fn(),
  },
  db: {
    collection: jest.fn(() => ({
      doc: jest.fn((id?: string) => ({
        get: jest.fn(() =>
          Promise.resolve({
            exists: true,
            id: id || "mock-id",
            data: () => ({
              id: id || "mock-id",
              name: "Mock User",
              email: "mock@example.com",
            }),
          })
        ),
        set: jest.fn(() => Promise.resolve()),
        update: jest.fn(() =>
          Promise.resolve({ id: id || "mock-id", name: "Updated Name" })
        ),
        delete: jest.fn(() => Promise.resolve()),
      })),
      add: jest.fn((data) => Promise.resolve({ id: "mock-id", ...data })),
      get: jest.fn(() =>
        Promise.resolve({
          docs: [
            { id: "mock-id", data: () => ({ name: "Mock User", email: "mock@example.com" }) },
          ],
        })
      ),
    })),
    runTransaction: jest.fn(),
    batch: jest.fn(),
  },
}));

// ✅ Fake Firebase env vars so no real credentials are loaded
process.env.FIREBASE_PROJECT_ID = "mock";
process.env.FIREBASE_CLIENT_EMAIL = "mock@example.com";
process.env.FIREBASE_PRIVATE_KEY = "mock-key";

// ✅ Reset mocks between tests
afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.resetModules();
});
