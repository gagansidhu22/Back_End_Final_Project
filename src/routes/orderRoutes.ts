import { Router } from 'express';
import { authenticate, requireRole } from '../middlewares/auth';
import { createOrder, updateOrderStatus, getMyOrders } from '../Contollers/OrderController';

const router = Router();
router.post('/', authenticate, createOrder);
router.patch('/:id/status', authenticate, requireRole(['staff','admin']), updateOrderStatus);
router.get('/my', authenticate, getMyOrders);
export default router;
