import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authAPI } from '../utils/apiService';
import { setUser, setTokens } from '../redux/authSlice';
import toast from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await authAPI.login({ email, password });
      dispatch(setUser(data.user));
      dispatch(
        setTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken
        })
      );
      toast.success('Logged in successfully!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amazon-orange"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amazon-orange"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-amazon-orange text-white font-bold py-2 rounded-lg hover:bg-yellow-600 disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-amazon-orange font-bold hover:underline">
            Register here
          </Link>
        </p>

        <div className="mt-6 p-3 bg-blue-50 rounded text-xs text-gray-600">
          <p className="font-bold mb-2">Demo Credentials:</p>
          <p>Admin: admin@amazon-clone.com / Admin@123</p>
          <p>User: john@example.com / User@123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
