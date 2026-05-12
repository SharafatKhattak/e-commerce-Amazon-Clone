import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { RootState } from '../redux/store';
import toast from 'react-hot-toast';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { totalItems } = useSelector((state: RootState) => state.cart);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <header className="bg-amazon-dark text-white shadow-lg sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <span className="text-3xl font-bold text-amazon-orange">Amazon</span>
          <span className="text-xl text-amazon-orange">.clone</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 mx-8">
          <div className="flex items-center bg-white rounded">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 text-black outline-none"
            />
            <button type="submit" className="px-4 py-2 bg-amazon-orange text-white">
              Search
            </button>
          </div>
        </form>

        {/* Right Section */}
        <div className="flex items-center gap-6 ml-8">
          {/* Cart */}
          <Link to="/cart" className="relative hover:text-amazon-orange transition">
            <div className="text-2xl">🛒</div>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-amazon-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
            <span className="text-xs">Cart</span>
          </Link>

          {/* Auth Links */}
          {user ? (
            <div className="flex items-center gap-4">
              <div className="text-sm">
                <p className="text-xs">Hello, {user.name}</p>
                <p className="text-amazon-orange font-bold">{user.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm hover:text-amazon-orange transition"
              >
                Logout
              </button>
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="text-sm hover:text-amazon-orange transition"
                >
                  Dashboard
                </Link>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm hover:text-amazon-orange transition">
                Login
              </Link>
              <Link to="/register" className="text-sm hover:text-amazon-orange transition">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Category Bar */}
      <div className="bg-amazon-blue text-white px-4 py-2">
        <div className="max-w-7xl mx-auto flex gap-6">
          <Link to="/products?category=Electronics" className="text-sm hover:text-amazon-orange">
            Electronics
          </Link>
          <Link to="/products?category=Clothing" className="text-sm hover:text-amazon-orange">
            Clothing
          </Link>
          <Link to="/products?category=Books" className="text-sm hover:text-amazon-orange">
            Books
          </Link>
          <Link to="/products?category=Home" className="text-sm hover:text-amazon-orange">
            Home
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
