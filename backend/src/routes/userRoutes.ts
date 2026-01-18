import { Router } from 'express';
import { isAuth, isOwner } from '../middleware/auth';
import { authLimiter } from '../middleware/rateLimiter';
import { validateRegister, validateLogin, validateUserIdParam } from '../middleware/validate';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  getUserDetailsFromId,
  updateUser
} from '../controllers/userController';

const router = Router();

// Auth routes with rate limiting and validation
router.post('/register', authLimiter, validateRegister, registerUser);
router.post('/login', authLimiter, validateLogin, loginUser);
router.post('/logout', logoutUser);

// Protected routes
router.get('/details', isAuth, getUserDetails);
router.get('/details/id', getUserDetailsFromId);
router.put('/update/:userId', validateUserIdParam, isAuth, isOwner, updateUser);

export default router;
