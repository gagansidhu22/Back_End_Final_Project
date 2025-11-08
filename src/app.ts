import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import menuRoutes from './routes/MenuRoutes';
import orderRoutes from './routes/orderRoutes';

dotenv.config();
const app = express();
app.use(express.json());

app.get('/', (req, res) => res.json({ ok: true }));

app.use('/api/users', userRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/orders', orderRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
