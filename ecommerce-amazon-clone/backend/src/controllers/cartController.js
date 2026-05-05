import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user.userId }).populate('items.product');

    if (!cart) {
      cart = new Cart({ user: req.user.userId, items: [] });
      await cart.save();
    }

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    let cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      cart = new Cart({ user: req.user.userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price
      });
    }

    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    cart.updatedAt = Date.now();

    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({
      message: 'Item added to cart',
      cart
    });
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const item = cart.items.find(item => item.product.toString() === productId);

    if (!item) {
      return res.status(404).json({ error: 'Item not in cart' });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(item => item.product.toString() !== productId);
    } else {
      item.quantity = quantity;
    }

    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    cart.updatedAt = Date.now();

    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({
      message: 'Cart updated',
      cart
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    cart.updatedAt = Date.now();

    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({
      message: 'Item removed from cart',
      cart
    });
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;
    cart.updatedAt = Date.now();

    await cart.save();

    res.status(200).json({
      message: 'Cart cleared',
      cart
    });
  } catch (error) {
    next(error);
  }
};
