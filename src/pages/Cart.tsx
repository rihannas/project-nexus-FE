import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { Button } from '../components/common/Button';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export const Cart: React.FC = () => {
  const { items, total } = useSelector((state: RootState) => state.cart);

  const breadcrumbItems = [{ label: 'Shopping Cart' }];

  if (items.length === 0) {
    return (
      <div className='min-h-screen bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <Breadcrumb items={breadcrumbItems} />

          <div className='text-center py-16'>
            <div className='text-gray-400 text-6xl mb-4'>🛒</div>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              Your cart is empty
            </h2>
            <p className='text-gray-600 mb-8 max-w-md mx-auto'>
              Looks like you haven't added any items to your cart yet. Start
              shopping to discover our African fashion collection.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link to='/shop'>
                <Button
                  icon={ShoppingBag}
                  size='lg'
                >
                  Start Shopping
                </Button>
              </Link>
              <Link to='/'>
                <Button
                  variant='outline'
                  icon={ArrowLeft}
                  size='lg'
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <Breadcrumb items={breadcrumbItems} />

        <h1 className='text-3xl font-heading font-bold text-gray-900 mb-8'>
          Shopping Cart (
          {items.reduce((total, item) => total + item.quantity, 0)} items)
        </h1>

        <div className='lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start'>
          {/* Cart Items */}
          <div className='lg:col-span-7'>
            <div className='bg-white rounded-lg shadow-sm border'>
              <div className='px-6 py-4 border-b border-gray-200'>
                <h2 className='text-lg font-semibold'>Cart Items</h2>
              </div>

              <div className='divide-y divide-gray-200'>
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.variant.id}`}
                    className='px-6'
                  >
                    <CartItem item={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className='mt-8 lg:mt-0 lg:col-span-5'>
            <CartSummary
              items={items}
              total={total}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
