import Product from '../models/Product.js';
import Review from '../models/Review.js';

export const getProducts = async (req, res, next) => {
  try {
    const { category, search, sort, page = 1, limit = 12 } = req.query;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    let query = Product.find(filter).populate('reviews').skip(skip).limit(limit);

    if (sort === 'price-asc') {
      query = query.sort({ price: 1 });
    } else if (sort === 'price-desc') {
      query = query.sort({ price: -1 });
    } else if (sort === 'rating') {
      query = query.sort({ rating: -1 });
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const products = await query;
    const total = await Product.countDocuments(filter);

    res.status(200).json({
      products,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews');

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock, images } = req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      images: images || [],
      createdBy: req.user.userId
    });

    await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to update this product' });
    }

    Object.assign(product, req.body);
    product.updatedAt = Date.now();
    await product.save();

    res.status(200).json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this product' });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const review = new Review({
      product: productId,
      user: req.user.userId,
      rating,
      comment
    });

    await review.save();

    const allReviews = await Review.find({ product: productId });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    product.rating = avgRating;
    product.numReviews = allReviews.length;
    product.reviews.push(review._id);
    await product.save();

    res.status(201).json({
      message: 'Review added successfully',
      review
    });
  } catch (error) {
    next(error);
  }
};
