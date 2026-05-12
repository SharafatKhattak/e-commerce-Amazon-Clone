import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateTokens = (userId, role) => {
  const accessToken = jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const user = new User({ name, email, password });
    await user.save();

    const { accessToken, refreshToken } = generateTokens(user._id, user.role);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      accessToken,
      refreshToken
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const { accessToken, refreshToken } = generateTokens(user._id, user.role);

    res.status(200).json({
      message: 'Logged in successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      accessToken,
      refreshToken
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token is required' });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const { accessToken: newAccessToken } = generateTokens(user._id, user.role);

    res.status(200).json({
      accessToken: newAccessToken
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};

export const logout = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};
