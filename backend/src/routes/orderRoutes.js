import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  createPaymentIntent,
  confirmPayment,
  cancelOrder
} from '../controllers/orderController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, createOrder);
router.get('/', authenticate, getOrders);
router.get('/:id', authenticate, getOrderById);
router.post('/payment-intent', authenticate, createPaymentIntent);
router.post('/confirm-payment', authenticate, confirmPayment);
router.put('/:id/cancel', authenticate, cancelOrder);

export default router;
