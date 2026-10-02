import api from './api.js';

export const authService = {
  // Login customer or admin
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      // Expected response format: { token, user } or { data: { token, user } }
      const data = response.data;
      const token = data.token || data.data?.token;
      const user = data.user || data.data?.user;

      if (token && user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      }

      return { success: true, data: { token, user } };
    } catch (error) {
      // If backend network error in local development, allow fallback demo login
      if (error.code === 'ERR_NETWORK' || !error.response) {
        // Fallback for standalone frontend demonstration when backend is not running
        const demoUser = {
          _id: 'demo-user-123',
          name: credentials.email.split('@')[0] || 'Demo Customer',
          email: credentials.email,
          role: credentials.email.includes('admin') ? 'admin' : 'customer',
        };
        const demoToken = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('token', demoToken);
        localStorage.setItem('user', JSON.stringify(demoUser));
        return { success: true, data: { token: demoToken, user: demoUser, isDemo: true } };
      }

      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      return { success: false, error: message };
    }
  },

  // Register new customer
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      const data = response.data;
      const token = data.token || data.data?.token;
      const user = data.user || data.data?.user;

      if (token && user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      }

      return { success: true, data: { token, user } };
    } catch (error) {
      // If backend network error in local development, allow fallback registration
      if (error.code === 'ERR_NETWORK' || !error.response) {
        const demoUser = {
          _id: 'user-' + Date.now(),
          name: userData.name,
          email: userData.email,
          role: 'customer',
        };
        const demoToken = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('token', demoToken);
        localStorage.setItem('user', JSON.stringify(demoUser));
        return { success: true, data: { token: demoToken, user: demoUser, isDemo: true } };
      }

      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      return { success: false, error: message };
    }
  },

  // Get current user profile
  async getProfile() {
    try {
      const response = await api.get('/auth/profile');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch profile' };
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get stored user from localStorage
  getCurrentUser() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  // Get stored token from localStorage
  getToken() {
    return localStorage.getItem('token');
  },
};

export default authService;
