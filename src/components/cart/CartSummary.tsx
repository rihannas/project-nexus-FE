import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '../../types';
import { Button } from '../common/Button';

interface CartSummaryProps {
  items: CartItemType[];
  total: number;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ items, total }) => {
  const subtotal = total;
  const shipping = subtotal > 0 ? 5.99 : 0; // Flat rate shipping
  const tax = subtotal * 0.08; // 8% tax
  const finalTotal = subtotal + shipping + tax;

  if (items.length === 0) {
    return null;
  }

  return (
    <div className='bg-gray-50 rounded-lg p-6 sticky top-4'>
      <h3 className='text-lg font-semibold mb-4'>Order Summary</h3>

      <div className='space-y-3 mb-6'>
        <div className='flex justify-between text-sm'>
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className='flex justify-between text-sm'>
          <span>Shipping</span>
          <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}</span>
        </div>

        <div className='flex justify-between text-sm'>
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className='border-t pt-3 flex justify-between font-semibold'>
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      <Button className='w-full mb-3'>Proceed to Checkout</Button>

      <Link to='/shop'>
        <Button
          variant='outline'
          className='w-full'
        >
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
};
