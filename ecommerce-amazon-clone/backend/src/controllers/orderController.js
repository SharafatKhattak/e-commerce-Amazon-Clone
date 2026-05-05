import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import stripe from '../config/stripe.js';

export const createOrder = async (req, res, next) => {
  try {
    const { shippingAddress, paymentMethod = 'stripe' } = req.body;

    const cart = await Cart.findOne({ user: req.user.userId }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const order = new Order({
      user: req.user.userId,
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.price
      })),
      shippingAddress,
      totalPrice: cart.totalPrice,
      paymentMethod,
      paymentStatus: 'pending'
    });

    await order.save();

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.user.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to view this order' });
    }

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const createPaymentIntent = async (req, res, next) => {
  try {
    const { orderId, amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        orderId,
        userId: req.user.userId
      }
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    next(error);
  }
};

export const confirmPayment = async (req, res, next) => {
  try {
    const { orderId, paymentIntentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.paymentStatus = 'completed';
    order.stripePaymentId = paymentIntentId;
    order.orderStatus = 'confirmed';

    await order.save();

    // Clear cart after successful payment
    await Cart.findOneAndUpdate(
      { user: req.user.userId },
      { items: [], totalItems: 0, totalPrice: 0 }
    );

    res.status(200).json({
      message: 'Payment confirmed successfully',
      order
    });
  } catch (error) {
    next(error);
  }
};

export const cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.user.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    if (['shipped', 'delivered'].includes(order.orderStatus)) {
      return res.status(400).json({ error: 'Cannot cancel shipped/delivered orders' });
    }

    order.orderStatus = 'cancelled';
    await order.save();

    res.status(200).json({
      message: 'Order cancelled successfully',
      order
    });
  } catch (error) {
    next(error);
  }
};
