import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getAuthToken,
  getStoredUser,
  setAuthToken,
  setStoredUser,
  clearAuth,
} from '../api/client';
import {
  loginUser,
  registerCustomer as apiRegisterCustomer,
  getCurrentProfile,
} from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getAuthToken());
  const [user, setUser] = useState(() => getStoredUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalConfig, setAuthModalConfig] = useState({
    defaultTab: 'signin', // 'signin' | 'register'
    title: 'VIP Client Sign In',
    subtitle: 'Sign in to access instant quotes, guaranteed rates, and luxury chauffeur reservations.',
    onAuthSuccess: null,
    redirectOnSuccess: null,
  });

  // Sync fresh profile on mount if token exists
  useEffect(() => {
    async function sync() {
      if (token) {
        try {
          const res = await getCurrentProfile();
          if (res?.user) {
            setUser(res.user);
            setStoredUser(res.user);
          }
        } catch (e) {
          // Token expired or invalid
          if (e.status === 401) {
            clearAuth();
            setToken(null);
            setUser(null);
          }
        }
      }
    }
    sync();
  }, [token]);

  const openAuthModal = (config = {}) => {
    setAuthModalConfig({
      defaultTab: config.defaultTab || 'signin',
      title: config.title || (config.defaultTab === 'register' ? 'Create VIP Client Account' : 'VIP Client Sign In'),
      subtitle:
        config.subtitle ||
        'Sign in to calculate instant flat-rate quotes, view vehicle availability, and manage reservations.',
      onAuthSuccess: config.onAuthSuccess || null,
      redirectOnSuccess: config.redirectOnSuccess || null,
    });
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (emailOrCredentials, maybePassword) => {
    let email = '';
    let password = '';

    if (typeof emailOrCredentials === 'object' && emailOrCredentials !== null) {
      email = emailOrCredentials.email || '';
      password = emailOrCredentials.password || '';
    } else {
      email = emailOrCredentials || '';
      password = maybePassword || '';
    }

    const res = await loginUser({ email, password });
    if (res?.tokens?.accessToken) {
      setToken(res.tokens.accessToken);
      setUser(res.user);
    }
    return res;
  };

  const registerCustomer = async (customerData) => {
    const res = await apiRegisterCustomer(customerData);
    if (res?.tokens?.accessToken) {
      setToken(res.tokens.accessToken);
      setUser(res.user);
    }
    return res;
  };

  const logout = () => {
    clearAuth();
    setToken(null);
    setUser(null);
  };

  const promptInstantQuote = (navigate, targetPath = '/reservations', onConfirmed = null) => {
    if (token && user) {
      if (onConfirmed) {
        onConfirmed(user);
      } else if (navigate && targetPath) {
        navigate(targetPath);
      }
    } else {
      openAuthModal({
        defaultTab: 'signin',
        title: 'Sign In for Instant Quote & Booking',
        subtitle: 'Please sign in or create a VIP account to view guaranteed flat-rate pricing and book your ride.',
        redirectOnSuccess: targetPath,
        onAuthSuccess: (authedUser) => {
          if (onConfirmed) {
            onConfirmed(authedUser);
          } else if (navigate && targetPath) {
            navigate(targetPath);
          }
        },
      });
    }
  };

  const value = {
    token,
    user,
    isAuthenticated: Boolean(token && user),
    isAuthModalOpen,
    authModalConfig,
    openAuthModal,
    closeAuthModal,
    login,
    registerCustomer,
    logout,
    promptInstantQuote,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
