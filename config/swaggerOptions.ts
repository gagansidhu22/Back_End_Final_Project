import swaggerJsdoc from "swagger-jsdoc";

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Api documentation for assignment 5",
    },

    components: {
      schemas: {
        CreateEmployee: {
          type: "object",
          properties: {
            name: { type: "string", example: "John Doe" },
            email: { type: "string", example: "john@example.com" },
            department: { type: "string", example: "HR" },
            branchId: { type: "integer", example: 1 }
          },
          required: ["name", "email", "department", "branchId"]
        },

        UpdateEmployee: {
          type: "object",
          properties: {
            name: { type: "string", example: "Updated Name" },
            email: { type: "string", example: "updated@example.com" },
            department: { type: "string", example: "IT" },
            branchId: { type: "integer", example: 3 }
          }
        }
      }
    },
  },

  apis: ["./src/routes/*.ts"],
};

export const generateSwaggerSpec = () => swaggerJsdoc(swaggerOptions);
