# Quick Start Guide - Amazon Clone E-Commerce

## 🚀 Quick Setup (5 minutes)

### 1. Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free)
- Stripe account (test mode)

### 2. Clone & Install
```bash
# Navigate to your projects folder
cd your-projects-folder

# Clone repository
git clone <your-repo-url>
cd ecommerce-amazon-clone

# Run setup script
# On Windows:
.\setup.bat
# On Mac/Linux:
chmod +x setup.sh && ./setup.sh
```

### 3. Configure Environment

**Backend (.env)**
1. Get MongoDB connection string from MongoDB Atlas
2. Generate JWT secrets (use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
3. Get Stripe keys from Stripe Dashboard
4. Get Cloudinary credentials (or use placeholders for demo)

**Frontend (.env)**
1. Set API URL to `http://localhost:5000/api`
2. Add Stripe public key (test mode)

### 4. Start Servers

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

### 5. Seed Database
```bash
cd backend
npm run seed
```

### 6. Access Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### 7. Login Credentials (after seeding)
- **Admin**: admin@amazon-clone.com / Admin@123
- **User**: john@example.com / User@123

---

## 🛠️ Development Commands

### Backend
```bash
npm run dev      # Start dev server
npm start        # Start production server
npm run seed     # Seed database with sample data
npm run lint     # Run linter
```

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run linter
```

---

## 🐳 Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

---

## 📚 Project Features

✅ User Authentication (JWT)
✅ Product Catalog with Search & Filters
✅ Shopping Cart & Checkout
✅ Order Management
✅ Wishlist
✅ Product Reviews
✅ Admin Dashboard
✅ Stripe Payment Integration
✅ Responsive Design
✅ API Rate Limiting
✅ Security Best Practices

---

## 🚨 Common Issues

### MongoDB Connection Failed
- Check MongoDB URI in .env
- Verify IP is whitelisted in MongoDB Atlas
- Ensure cluster is active

### Port Already in Use
```bash
# Change port in .env or:
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Frontend Can't Connect to Backend
- Check backend is running
- Verify API URL in frontend .env
- Check CORS settings in backend

---

## 📖 API Documentation

Full API docs available in `postman_collection.json`

Import in Postman:
1. Open Postman
2. Import → Upload Files
3. Select `postman_collection.json`
4. Set base_url variable
5. Set access_token after login

---

## 🎯 Next Steps

1. Customize branding and colors
2. Add more product categories
3. Implement email notifications
4. Add product inventory management
5. Set up analytics
6. Implement admin analytics dashboard
7. Add advanced search features
8. Implement recommendations engine

---

**Questions?** Check the main README.md for detailed documentation.
