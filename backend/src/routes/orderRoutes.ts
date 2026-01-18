import { Router } from 'express';
import { isAuth } from '../middleware/auth';
import { validateMongoId, validateUserIdParam } from '../middleware/validate';
import {
  getAllOrders,
  getUserOrders,
  createOrder,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} from '../controllers/orderController';

const router = Router();

// All order routes require authentication
router.use(isAuth);

// User-specific orders
router.get('/user/:userId', validateUserIdParam, getUserOrders);

// General order routes
router.get('/', getAllOrders);
router.post('/', createOrder);
router.get('/:id', validateMongoId, getOrderById);
router.put('/:id', validateMongoId, updateOrderStatus);
router.delete('/:id', validateMongoId, deleteOrder);

export default router;
