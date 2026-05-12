import mongoose from 'mongoose';
import 'dotenv/config';
import User from '../src/models/User.js';
import Product from '../src/models/Product.js';
import { connectDB } from '../src/config/database.js';

const seedProducts = [
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Latest flagship smartphone with 200MP camera',
    price: 1299,
    discountPrice: 1099,
    category: 'Electronics',
    stock: 50,
    images: ['https://via.placeholder.com/400?text=Galaxy+S24'],
    rating: 4.5,
    numReviews: 324
  },
  {
    name: 'Apple MacBook Pro 16"',
    description: 'Powerful laptop with M3 Max chip',
    price: 2499,
    discountPrice: 2199,
    category: 'Electronics',
    stock: 30,
    images: ['https://via.placeholder.com/400?text=MacBook+Pro'],
    rating: 4.8,
    numReviews: 512
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise canceling headphones',
    price: 399,
    discountPrice: 349,
    category: 'Electronics',
    stock: 100,
    images: ['https://via.placeholder.com/400?text=Sony+Headphones'],
    rating: 4.7,
    numReviews: 2103
  },
  {
    name: 'Nike Air Max 90',
    description: 'Classic sneakers with Air cushioning',
    price: 130,
    discountPrice: 99,
    category: 'Clothing',
    stock: 200,
    images: ['https://via.placeholder.com/400?text=Nike+Air+Max'],
    rating: 4.4,
    numReviews: 1523
  },
  {
    name: 'The Midnight Library',
    description: 'Bestselling fiction novel by Matt Haig',
    price: 16.99,
    discountPrice: 12.99,
    category: 'Books',
    stock: 500,
    images: ['https://via.placeholder.com/400?text=Midnight+Library'],
    rating: 4.6,
    numReviews: 3421
  },
  {
    name: 'DysonV15 Detect Vacuum',
    description: 'Cordless vacuum with laser detection',
    price: 749,
    discountPrice: 649,
    category: 'Home',
    stock: 25,
    images: ['https://via.placeholder.com/400?text=Dyson+Vacuum'],
    rating: 4.8,
    numReviews: 892
  },
  {
    name: 'Le Creuset Dutch Oven',
    description: 'Premium 5.5-quart enameled cast iron',
    price: 399,
    discountPrice: 299,
    category: 'Home',
    stock: 80,
    images: ['https://via.placeholder.com/400?text=Dutch+Oven'],
    rating: 4.9,
    numReviews: 2341
  },
  {
    name: 'Adidas Ultraboost 23',
    description: 'Ultra comfortable running shoes',
    price: 180,
    discountPrice: 139,
    category: 'Clothing',
    stock: 150,
    images: ['https://via.placeholder.com/400?text=Ultraboost'],
    rating: 4.5,
    numReviews: 892
  },
  {
    name: 'Atomic Habits Book',
    description: 'Build better habits by James Clear',
    price: 18,
    discountPrice: 13.50,
    category: 'Books',
    stock: 400,
    images: ['https://via.placeholder.com/400?text=Atomic+Habits'],
    rating: 4.7,
    numReviews: 5234
  },
  {
    name: 'iPad Pro 12.9"',
    description: 'Powerful tablet with M2 chip',
    price: 1099,
    discountPrice: 949,
    category: 'Electronics',
    stock: 60,
    images: ['https://via.placeholder.com/400?text=iPad+Pro'],
    rating: 4.6,
    numReviews: 1834
  }
];

const seedUsers = [
  {
    name: 'Admin User',
    email: 'admin@amazon-clone.com',
    password: 'Admin@123',
    role: 'admin',
    phone: '+1 (555) 123-4567',
    address: {
      street: '123 Admin St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    }
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'User@123',
    role: 'user',
    phone: '+1 (555) 234-5678',
    address: {
      street: '456 Main St',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA'
    }
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'User@123',
    role: 'user',
    phone: '+1 (555) 345-6789',
    address: {
      street: '789 Oak Ave',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    }
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    // Seed users
    const createdUsers = await User.insertMany(seedUsers);
    console.log(`✅ ${createdUsers.length} users seeded`);

    // Seed products
    const productsWithCreator = seedProducts.map(product => ({
      ...product,
      createdBy: createdUsers[0]._id
    }));

    const createdProducts = await Product.insertMany(productsWithCreator);
    console.log(`✅ ${createdProducts.length} products seeded`);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
