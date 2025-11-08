// src/app.ts
import express from 'express';
import userRoutes from './api/v1/routes/userRoutes';
import menuRoutes from './api/v1/routes/MenuRoutes';
import orderRoutes from './api/v1/routes/orderRoutes';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (req, res) => res.json({ ok: true }));

app.use('/api/users', userRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/orders', orderRoutes);

// Error handler
app.use(
  (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
);

export default app;
