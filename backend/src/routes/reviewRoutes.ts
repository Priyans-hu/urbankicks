import { Router } from 'express';
import { isAuth } from '../middleware/auth';
import { validateReview, validateMongoId } from '../middleware/validate';
import {
  createReview,
  getAllReviews,
  getReviewById,
  getReviewsByProductId,
  deleteReview
} from '../controllers/reviewController';

const router = Router();

// Public routes
router.get('/', getAllReviews);
router.get('/:id', validateMongoId, getReviewById);
router.get('/product/:productId', getReviewsByProductId);

// Protected routes
router.post('/', isAuth, validateReview, createReview);
router.delete('/:id', isAuth, validateMongoId, deleteReview);

export default router;
