import { Router } from 'express';
import { isAuth } from '../middleware/auth';
import { validateCartItem, validateUserIdParam } from '../middleware/validate';
import {
  getCartByUserId,
  addItemToCart,
  removeItemFromCart,
  updateItemInCart,
  clearCart
} from '../controllers/cartController';

const router = Router();

// All cart routes require authentication
router.use(isAuth);

router.get('/:userId', validateUserIdParam, getCartByUserId);
router.post('/:userId', validateUserIdParam, validateCartItem, addItemToCart);
router.delete('/:userId/:productId', removeItemFromCart);
router.put('/:userId/:item', updateItemInCart);
router.delete('/:userId', validateUserIdParam, clearCart);

export default router;
