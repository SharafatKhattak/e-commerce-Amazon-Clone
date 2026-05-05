import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: Number,
    price: Number
  }],
  shippingAddress: {
    name: String,
    email: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  totalPrice: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['stripe', 'paypal', 'cod'],
    default: 'stripe'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  stripePaymentId: String,
  trackingNumber: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  deliveredAt: Date
});

export default mongoose.model('Order', orderSchema);
