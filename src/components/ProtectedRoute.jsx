import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { getAuthToken, getStoredUser } from '../api/client';

/**
 * Route Guard for Chauffeur / Driver Portal
 * Ensures user has an active token and the 'DRIVER' role.
 */
export default function DriverProtectedRoute({ children }) {
  const location = useLocation();
  const token = getAuthToken();
  const user = getStoredUser();

  // If no token or user is not a DRIVER, redirect to driver login
  if (!token || (user && user.role !== 'DRIVER')) {
    return <Navigate to="/driver/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
}
