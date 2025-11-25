import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Restaurant API",
      version: "1.0.0",
      description: "API documentation for the Restaurant Management system",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        // Menu Schemas
        Menu: {
          type: "object",
          required: ["id", "name", "price"],
          properties: {
            id: { type: "string", example: "12345" },
            name: { type: "string", example: "Pizza" },
            price: { type: "number", example: 12.5 },
          },
        },
        CreateMenu: {
          type: "object",
          required: ["name", "price"],
          properties: {
            name: { type: "string", example: "Pizza" },
            price: { type: "number", example: 12.5 },
          },
        },
        UpdateMenu: {
          type: "object",
          properties: {
            name: { type: "string", example: "Updated Pizza" },
            price: { type: "number", example: 13.0 },
          },
        },

        // Order Schemas
        Order: {
          type: "object",
          required: ["id", "menuId", "quantity", "status"],
          properties: {
            id: { type: "string", example: "abc123" },
            menuId: { type: "string", example: "12345" },
            quantity: { type: "integer", example: 2 },
            status: { type: "string", example: "pending" },
          },
        },
        CreateOrder: {
          type: "object",
          required: ["menuId", "quantity"],
          properties: {
            menuId: { type: "string", example: "12345" },
            quantity: { type: "integer", example: 2 },
          },
        },
        UpdateOrder: {
          type: "object",
          properties: {
            quantity: { type: "integer", example: 3 },
            status: { type: "string", example: "completed" },
          },
        },

        // User Schemas
        User: {
          type: "object",
          required: ["id", "name", "email", "role"],
          properties: {
            id: { type: "string", example: "u123" },
            name: { type: "string", example: "John Doe" },
            email: { type: "string", example: "john@example.com" },
            role: { type: "string", example: "user" },
          },
        },
        CreateUser: {
          type: "object",
          required: ["name", "email", "role"],
          properties: {
            name: { type: "string", example: "John Doe" },
            email: { type: "string", example: "john@example.com" },
            role: { type: "string", example: "user" },
          },
        },
        UpdateUser: {
          type: "object",
          properties: {
            name: { type: "string", example: "Jane Doe" },
            email: { type: "string", example: "jane@example.com" },
            role: { type: "string", example: "manager" },
          },
        },

        // Error schema
        Error: {
          type: "object",
          properties: {
            message: { type: "string", example: "Invalid input" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },

  // Only include route files with JSDoc comments
  apis: ["./src/api/v1/routes/*.ts"],
};

export const generateSwaggerSpec = (): object => {
  return swaggerJsdoc(swaggerOptions);
};
