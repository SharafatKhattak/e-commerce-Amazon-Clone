<<<<<<< HEAD
# e-commerce-Amazon-Clone
=======
# 🚀 Amazon Clone - Full-Stack E-Commerce Application

A production-ready e-commerce application built with modern web technologies, inspired by Amazon's architecture and design.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Deployment](#deployment)

## ✨ Features

### User Features
- ✅ User authentication (login/register)
- ✅ Product browsing with search & filters
- ✅ Product detail pages with reviews
- ✅ Shopping cart management
- ✅ Checkout process
- ✅ Order management
- ✅ Wishlist functionality
- ✅ User profile management
- ✅ JWT-based secure authentication

### Admin Features
- ✅ Admin dashboard
- ✅ Product CRUD operations
- ✅ User management
- ✅ Order management
- ✅ Sales analytics

### Technical Features
- ✅ Full REST API with error handling
- ✅ Redux Toolkit for state management
- ✅ React Query for server state
- ✅ Stripe payment integration
- ✅ Cloudinary image storage
- ✅ Responsive design with Tailwind CSS
- ✅ Type-safe with TypeScript
- ✅ Secure password hashing with bcrypt
- ✅ Rate limiting
- ✅ CORS protection

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Stripe** - Payment processing
- **Cloudinary** - Image storage

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State management
- **React Query** - Server state management
- **Axios** - HTTP client
- **React Router** - Routing
- **React Hot Toast** - Notifications

## 📁 Project Structure

```
ecommerce-amazon-clone/
├── backend/
│   ├── src/
│   │   ├── config/          # DB, Stripe, Cloudinary configs
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Auth, error handling
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # Express routes
│   │   └── app.js           # Express app setup
│   ├── scripts/
│   │   └── seed.js          # Database seeding script
│   ├── .env.example         # Environment template
│   ├── package.json
│   └── server.js            # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── redux/           # Redux store & slices
│   │   ├── hooks/           # Custom hooks
│   │   ├── utils/           # API, helpers
│   │   ├── App.tsx          # App component
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── .env.example
│   └── package.json
│
└── README.md
```

## 💻 Installation

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account
- Git

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd ecommerce-amazon-clone
```

### Step 2: Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure your .env file with actual values
```

### Step 3: Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure your .env file
```

## 🔑 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/amazon_clone
JWT_SECRET=your_super_secret_key_minimum_32_characters_long
JWT_REFRESH_SECRET=your_refresh_secret_minimum_32_characters_long
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
```

## 🚀 Running the Application

### Run Backend
```bash
cd backend

# Development mode with hot reload
npm run dev

# Production mode
npm start

# Seed database with sample data
npm run seed
```

### Run Frontend
```bash
cd frontend

# Development mode
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

### Demo Credentials

**Admin Account:**
- Email: `admin@amazon-clone.com`
- Password: `Admin@123`

**User Account:**
- Email: `john@example.com`
- Password: `User@123`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products (with filters & pagination)
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)
- `POST /api/products/:id/reviews` - Add product review

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/:productId` - Remove from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders/payment-intent` - Create Stripe payment intent
- `POST /api/orders/confirm-payment` - Confirm payment
- `PUT /api/orders/:id/cancel` - Cancel order

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/wishlist/add` - Add to wishlist
- `DELETE /api/users/wishlist/:productId` - Remove from wishlist
- `GET /api/users/wishlist` - Get wishlist
- `GET /api/users` - Get all users (admin)
- `DELETE /api/users/:id` - Delete user (admin)

## 🗄️ Database Models

### User
```
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: Object,
  role: 'user' | 'admin',
  avatar: String,
  wishlist: [ObjectId],
  createdAt: Date
}
```

### Product
```
{
  name: String,
  description: String,
  price: Number,
  discountPrice: Number,
  category: String,
  images: [String],
  stock: Number,
  rating: Number,
  numReviews: Number,
  reviews: [ObjectId],
  createdBy: ObjectId,
  createdAt: Date
}
```

### Order
```
{
  user: ObjectId,
  items: [{product, quantity, price}],
  shippingAddress: Object,
  totalPrice: Number,
  paymentMethod: String,
  paymentStatus: String,
  orderStatus: String,
  stripePaymentId: String,
  createdAt: Date
}
```

## 🌐 Deployment

### Frontend Deployment (Vercel)
1. Push code to GitHub
2. Import repository in Vercel
3. Set environment variables
4. Deploy

### Backend Deployment (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables
6. Deploy

### Database (MongoDB Atlas)
1. Create cluster
2. Create database user
3. Add IP to whitelist
4. Copy connection string to backend .env

## 🧪 Testing

### Seed Database
```bash
cd backend
npm run seed
```

### Test with Demo Credentials
- Login with admin/user accounts
- Browse products
- Add to cart
- Complete checkout (Stripe test mode)

## 📝 Security Features

- ✅ Password hashing with bcrypt (12 rounds)
- ✅ JWT authentication (15m access, 7d refresh)
- ✅ Rate limiting on API endpoints
- ✅ CORS protection
- ✅ Helmet security headers
- ✅ Input validation & sanitization
- ✅ Error handling & logging
- ✅ Protected routes

## 🚀 Performance Optimizations

- ✅ Image lazy loading
- ✅ Code splitting with React Router
- ✅ Server-side pagination
- ✅ API response caching with React Query
- ✅ Responsive design
- ✅ CSS minification with Tailwind
- ✅ Production build optimization

## 📄 License

MIT

## 👨‍💻 Author

Created as a full-stack e-commerce application demonstration.

---

**Happy Coding! 🎉**
>>>>>>> 6c3f8f9 (Initial commit: Amazon Clone project)
