import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useAuth } from '../../hooks/useAuth';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated, user, logout } = useAuth();

  const cartItemsCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className='bg-white shadow-sm border-b'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link
            to='/'
            className='flex items-center'
          >
            <div className='w-10 h-10 bg-primary-orange rounded-full flex items-center justify-center'>
              <span className='text-white font-bold text-lg'>A</span>
            </div>
            <span className='ml-2 text-xl font-heading font-bold text-gray-900'>
              AfriClothing
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            <Link
              to='/'
              className='text-gray-700 hover:text-primary-orange transition-colors'
            >
              Home
            </Link>
            <Link
              to='/shop'
              className='text-gray-700 hover:text-primary-orange transition-colors'
            >
              Shop
            </Link>
          </nav>

          {/* Search Bar */}
          <div className='hidden md:flex flex-1 max-w-lg mx-8'>
            <form
              onSubmit={handleSearch}
              className='w-full'
            >
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search products...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent'
                />
                <button
                  type='submit'
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-orange'
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
          </div>

          {/* Desktop Actions */}
          <div className='hidden md:flex items-center space-x-4'>
            <Link
              to='/cart'
              className='relative p-2 text-gray-700 hover:text-primary-orange'
            >
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className='absolute -top-1 -right-1 bg-primary-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className='relative group'>
                <button className='flex items-center space-x-2 p-2'>
                  <User size={24} />
                  <span className='text-sm'>{user?.username}</span>
                </button>
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
                  <Link
                    to='/account'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to='/login'
                className='text-gray-700 hover:text-primary-orange'
              >
                <User size={24} />
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className='md:hidden p-2'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className='md:hidden py-4 border-t'>
            <div className='flex flex-col space-y-4'>
              <Link
                to='/'
                className='text-gray-700 hover:text-primary-orange'
              >
                Home
              </Link>
              <Link
                to='/shop'
                className='text-gray-700 hover:text-primary-orange'
              >
                Shop
              </Link>
              <form
                onSubmit={handleSearch}
                className='w-full'
              >
                <div className='relative'>
                  <input
                    type='text'
                    placeholder='Search products...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent'
                  />
                  <button
                    type='submit'
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-orange'
                  >
                    <Search size={20} />
                  </button>
                </div>
              </form>
              <div className='flex items-center justify-between'>
                <Link
                  to='/cart'
                  className='flex items-center text-gray-700 hover:text-primary-orange'
                >
                  <ShoppingCart
                    size={20}
                    className='mr-2'
                  />
                  Cart ({cartItemsCount})
                </Link>
                {isAuthenticated ? (
                  <div className='flex items-center space-x-2'>
                    <span className='text-sm'>Hello, {user?.username}</span>
                    <button
                      onClick={handleLogout}
                      className='text-sm text-primary-orange'
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to='/login'
                    className='text-gray-700 hover:text-primary-orange'
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
