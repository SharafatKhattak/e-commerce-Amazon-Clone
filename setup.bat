@echo off
echo 🚀 Setting up Amazon Clone E-Commerce Application...
echo.

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install
copy .env.example .env
echo ✅ Backend dependencies installed
echo ⚠️  Please update backend\.env with your credentials
echo.

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd ../frontend
call npm install
copy .env.example .env
echo ✅ Frontend dependencies installed
echo ⚠️  Please update frontend\.env with your API URL and Stripe key
echo.

REM Back to root
cd ..

echo ✅ Setup complete!
echo.
echo 📝 Next steps:
echo 1. Update backend\.env with MongoDB, Stripe, and Cloudinary credentials
echo 2. Update frontend\.env with API URL and Stripe public key
echo 3. Run backend: cd backend ^&^& npm run dev
echo 4. Run frontend: cd frontend ^&^& npm run dev
echo 5. Seed database: cd backend ^&^& npm run seed
echo.
echo 🎉 Happy coding!
pause
