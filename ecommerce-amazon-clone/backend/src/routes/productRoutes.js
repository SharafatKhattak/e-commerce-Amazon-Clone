import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview
} from '../controllers/productController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', authenticate, authorize(['admin']), createProduct);
router.put('/:id', authenticate, authorize(['admin']), updateProduct);
router.delete('/:id', authenticate, authorize(['admin']), deleteProduct);
router.post('/:id/reviews', authenticate, addReview);

export default router;
