import swaggerJsdoc from "swagger-jsdoc";
import fs from "fs";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Final Project API",
      version: "1.0.0",
    },
  },
  apis: [
    "./src/routes/*.ts",           // your routes
    "./src/api/v1/validations/*.ts" // your schemas
  ],
};

const openapiSpec = swaggerJsdoc(options);
fs.writeFileSync("openapi.json", JSON.stringify(openapiSpec, null, 2));
console.log("OpenAPI specification generated successfully!");
