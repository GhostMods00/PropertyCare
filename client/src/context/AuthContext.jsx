import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
const AuthContext = createContext(null);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configure axios defaults
  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Add token to requests if it exists
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Check if user is logged in on initial load
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        try {
          const response = await api.get('/auth/me');
          setUser(response.data.user);
        } catch (error) {
          console.error('Auth initialization error:', error);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });

      const { token: newToken, user: userData } = response.data;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      setError(null);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'An error occurred during login';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);

      const { token: newToken, user: newUser } = response.data;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(newUser);
      setError(null);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'An error occurred during registration';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setError(null);
    // Optional: Redirect to login page or home page
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const response = await api.put('/auth/update-profile', userData);
      setUser(response.data.user);
      setError(null);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error updating profile';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  // Check if token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp < Date.now() / 1000;
    } catch (error) {
      return true;
    }
  };

  // The context value that will be supplied to any descendants of this component.
  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!token && !isTokenExpired(token),
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
