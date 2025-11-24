import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Restaurant API",
      version: "1.0.0",
      description: "This is the API documentation for the Restaurant Management application.",
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
        // ✅ Add everything you reference in $ref:
        CreateMenu: {
          type: "object",
          properties: {
            name: { type: "string", example: "Pizza" },
            price: { type: "number", example: 12.5 },
          },
          required: ["name", "price"],
        },
        UpdateMenu: {
          type: "object",
          properties: {
            name: { type: "string", example: "Updated Pizza" },
            price: { type: "number", example: 13.0 },
          },
        },
        CreateOrder: {
          type: "object",
          properties: {
            menuId: { type: "string", example: "12345" },
            quantity: { type: "integer", example: 2 },
          },
          required: ["menuId", "quantity"],
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string", example: "Invalid input" },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    path.resolve(__dirname, "../src/api/v1/routes/*.ts"),
    path.resolve(__dirname, "../src/api/v1/validation/*.ts"),
  ],
};

export const generateSwaggerSpec = (): object => {
  return swaggerJsdoc(swaggerOptions);
};
