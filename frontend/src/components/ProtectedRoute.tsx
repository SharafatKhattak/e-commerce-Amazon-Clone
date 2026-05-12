import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
