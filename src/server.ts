// src/server.ts
import dotenv from "dotenv";
import app from "./app";
import { Server } from "http";

// load environment variables
dotenv.config();

const PORT: string | number = process.env.PORT || 3000;

const server: Server = app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`
  );
});

export { server };
