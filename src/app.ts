// src/app.ts
import express from 'express';
import setupSwagger from "../config/swagger";
import userRoutes from './api/v1/routes/userRoutes';
import menuRoutes from './api/v1/routes/MenuRoutes';
import orderRoutes from './api/v1/routes/orderRoutes';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/menus', menuRoutes);
app.use('/api/v1/orders', orderRoutes);

 
// Setup Swagger
setupSwagger(app);

export default app;
