import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide product description']
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    min: 0
  },
  discountPrice: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
    type: String,
    enum: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Toys'],
    required: true
  },
  images: [{
    type: String
  }],
  thumbnail: String,
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Product', productSchema);
