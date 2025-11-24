// src/app.ts
import express from 'express';
import { consoleLogger, accessLogger, errorLogger } from "../src/api/v1/Middleware/logger";
import setupSwagger from "../config/swagger";
import errorHandler from "./api/v1/Middleware/errorHandler";
import userRoutes from './api/v1/routes/userRoutes';
import menuRoutes from './api/v1/routes/MenuRoutes';
import orderRoutes from './api/v1/routes/orderRoutes';
import adminRoutes from "./api/v1/routes/adminRoutes"

import dotenv from 'dotenv';

dotenv.config();
const app = express();
/**
 * Middleware integration order
 * 1. Logging (console + file)
 * 2. Body parsing (JSON)
 * 3. Routes (with auth + authorization inside routes if required)
 * 4. Error logging (for failed requests)
 * 5. Global error handler (final catch)
 */

// Logging middleware
app.use(consoleLogger);
app.use(accessLogger);

app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/menus', menuRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use("/api/v1/admin", adminRoutes);

// Error logger (captures 4xx/5xx)
app.use(errorLogger);

// Global error handler
app.use(errorHandler);

// Setup Swagger
setupSwagger(app);

export default app;
