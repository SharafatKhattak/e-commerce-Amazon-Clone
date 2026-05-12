import express from 'express';
import {
  getProfile,
  updateProfile,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  getAllUsers,
  deleteUser
} from '../controllers/userController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.post('/wishlist/add', authenticate, addToWishlist);
router.delete('/wishlist/:productId', authenticate, removeFromWishlist);
router.get('/wishlist', authenticate, getWishlist);
router.get('/', authenticate, authorize(['admin']), getAllUsers);
router.delete('/:id', authenticate, authorize(['admin']), deleteUser);

export default router;
