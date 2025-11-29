import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/common/Button';
import { Breadcrumb } from '../components/layout/Breadcrumb';

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { login, register, loading } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!isLogin && !formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (isLogin) {
        await login({
          username: formData.username,
          password: formData.password,
        });
      } else {
        await register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
      }
      navigate('/');
    } catch (error) {
      setErrors({ submit: 'Authentication failed. Please try again.' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const breadcrumbItems = [{ label: isLogin ? 'Login' : 'Register' }];

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <Breadcrumb items={breadcrumbItems} />

        <div className='max-w-md mx-auto'>
          <div className='bg-white rounded-lg shadow-sm border p-8'>
            <div className='text-center mb-8'>
              <h1 className='text-3xl font-heading font-bold text-gray-900 mb-2'>
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className='text-gray-600'>
                {isLogin
                  ? 'Sign in to your account to continue shopping'
                  : 'Join us to discover African fashion'}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className='space-y-6'
            >
              {/* Username */}
              <div>
                <label
                  htmlFor='username'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Username
                </label>
                <input
                  id='username'
                  name='username'
                  type='text'
                  value={formData.username}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent'
                  placeholder='Enter your username'
                />
                {errors.username && (
                  <p className='mt-1 text-sm text-red-600'>{errors.username}</p>
                )}
              </div>

              {/* Email (Register only) */}
              {!isLogin && (
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Email
                  </label>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent'
                    placeholder='Enter your email'
                  />
                  {errors.email && (
                    <p className='mt-1 text-sm text-red-600'>{errors.email}</p>
                  )}
                </div>
              )}

              {/* Password */}
              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Password
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent'
                  placeholder='Enter your password'
                />
                {errors.password && (
                  <p className='mt-1 text-sm text-red-600'>{errors.password}</p>
                )}
              </div>

              {/* Confirm Password (Register only) */}
              {!isLogin && (
                <div>
                  <label
                    htmlFor='confirmPassword'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Confirm Password
                  </label>
                  <input
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent'
                    placeholder='Confirm your password'
                  />
                  {errors.confirmPassword && (
                    <p className='mt-1 text-sm text-red-600'>
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {errors.submit && (
                <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
                  <p className='text-sm text-red-600'>{errors.submit}</p>
                </div>
              )}

              <Button
                type='submit'
                loading={loading}
                className='w-full'
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className='mt-6 text-center'>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className='text-primary-orange hover:text-primary-red font-medium'
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
