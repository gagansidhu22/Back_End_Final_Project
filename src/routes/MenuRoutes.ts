import { Router } from 'express';
import { authenticate, requireRole } from '../middlewares/auth';
import { getMenus, createMenu, updateMenu, deleteMenu } from '../controllers/menuController';

const router = Router();
router.get('/', getMenus);
router.post('/', authenticate, requireRole(['admin','staff']), createMenu);
router.put('/:id', authenticate, requireRole(['admin','staff']), updateMenu);
router.delete('/:id', authenticate, requireRole('admin'), deleteMenu);
export default router;
