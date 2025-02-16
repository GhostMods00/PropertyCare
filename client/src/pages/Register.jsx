import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'manager'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      const result = await register(registerData);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-dark flex flex-col">
      {/* Back to home button */}
      <div className="p-4">
        <motion.button
          whileHover={{ x: -4 }}
          onClick={() => navigate('/')}
          className="text-gray-400 hover:text-primary flex items-center gap-2"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Home
        </motion.button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-dark p-8 rounded-xl border border-dark-lighter">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-center text-3xl font-extrabold text-white">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:text-primary-light">
                Sign in
              </Link>
            </p>
          </motion.div>

          <motion.form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg p-4 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4 rounded-md">
              <div>
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-dark-lighter placeholder-gray-500 text-gray-100 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-dark-lighter"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-dark-lighter placeholder-gray-500 text-gray-100 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-dark-lighter"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-dark-lighter placeholder-gray-500 text-gray-100 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-dark-lighter"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-dark-lighter placeholder-gray-500 text-gray-100 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-dark-lighter"
                  placeholder="Confirm Password"
                />
              </div>
              <div>
                <label htmlFor="role" className="sr-only">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-dark-lighter placeholder-gray-500 text-gray-100 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-dark-lighter"
                >
                  <option value="manager">Property Manager</option>
                  <option value="staff">Maintenance Staff</option>
                </select>
              </div>
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-dark bg-gradient-to-r from-primary to-primary-light hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Register;