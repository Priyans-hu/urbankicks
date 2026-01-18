import { Router } from 'express';
import { isAuth } from '../middleware/auth';
import { validateProduct, validateMongoId } from '../middleware/validate';
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController';

const router = Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', validateMongoId, getProductById);
router.get('/category/:category', getProductsByCategory);

// Protected routes
router.post('/', isAuth, validateProduct, createProduct);
router.put('/:id', isAuth, validateMongoId, validateProduct, updateProduct);
router.delete('/:id', isAuth, validateMongoId, deleteProduct);

export default router;
