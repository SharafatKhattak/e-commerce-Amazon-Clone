import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/apiService';
import { setUser, setTokens } from '../redux/authSlice';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useCallback(
    async (email: string, password: string) => {
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
        return true;
      } catch (error: any) {
        toast.error(error.response?.data?.error || 'Login failed');
        return false;
      }
    },
    [dispatch, navigate]
  );

  const register = useCallback(
    async (formData: any) => {
      try {
        const { data } = await authAPI.register(formData);
        dispatch(setUser(data.user));
        dispatch(
          setTokens({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken
          })
        );
        toast.success('Registered successfully!');
        navigate('/');
        return true;
      } catch (error: any) {
        toast.error(error.response?.data?.error || 'Registration failed');
        return false;
      }
    },
    [dispatch, navigate]
  );

  return { login, register };
};
