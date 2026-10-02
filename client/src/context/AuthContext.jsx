import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Initial sync
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setAuthError(null);
    const result = await authService.login({ email, password });
    if (result.success) {
      setUser(result.data.user);
      setToken(result.data.token);
      return { success: true, user: result.data.user };
    } else {
      setAuthError(result.error);
      return { success: false, error: result.error };
    }
  };

  const register = async (name, email, password) => {
    setAuthError(null);
    const result = await authService.register({ name, email, password });
    if (result.success) {
      setUser(result.data.user);
      setToken(result.data.token);
      return { success: true, user: result.data.user };
    } else {
      setAuthError(result.error);
      return { success: false, error: result.error };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    setAuthError(null);
  };

  const value = {
    user,
    token,
    loading,
    authError,
    setAuthError,
    isAuthenticated: !!user && !!token,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
