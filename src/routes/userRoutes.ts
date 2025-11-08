import { Router } from 'express';
import { authenticate, requireRole } from '../middlewares/auth';
import { createOrGetUser, getAllUsers } from '../Contollers/userController';

const router = Router();
router.post('/', authenticate, createOrGetUser);
router.get('/', authenticate, requireRole('admin'), getAllUsers);
export default router;
