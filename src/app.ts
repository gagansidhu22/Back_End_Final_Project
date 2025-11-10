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

app.get('/', (_req, res) => res.json({ ok: true }));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/menus', menuRoutes);
app.use('/api/v1/orders', orderRoutes);

// Error handler
app.use(
  (err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
);
 
// Setup Swagger
setupSwagger(app);

export default app;
