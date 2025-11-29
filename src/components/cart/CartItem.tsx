import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../store/slices/cartSlice';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(
      removeFromCart({
        productId: item.product.id,
        variantId: item.variant.id,
      })
    );
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemove();
    } else {
      dispatch(
        updateQuantity({
          productId: item.product.id,
          variantId: item.variant.id,
          quantity: newQuantity,
        })
      );
    }
  };

  const mainImage =
    item.product.main_image ||
    item.product.images?.find((img) => img.is_main)?.image ||
    item.product.images?.[0]?.image;

  return (
    <div className='flex items-center space-x-4 py-4 border-b border-gray-200'>
      {/* Product Image */}
      <div className='flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden'>
        {mainImage ? (
          <img
            src={mainImage}
            alt={item.product.name}
            className='w-full h-full object-cover'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center text-gray-400'>
            No Image
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className='flex-1 min-w-0'>
        <h3 className='font-medium text-gray-900 truncate'>
          {item.product.name}
        </h3>
        <p className='text-sm text-gray-500'>Size: {item.variant.size}</p>
        <p className='text-lg font-semibold text-primary-orange'>
          ${parseFloat(item.variant.price).toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className='flex items-center space-x-2'>
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className='p-1 rounded-full hover:bg-gray-100 transition-colors'
          disabled={item.quantity <= 1}
        >
          <Minus size={16} />
        </button>

        <span className='w-8 text-center font-medium'>{item.quantity}</span>

        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className='p-1 rounded-full hover:bg-gray-100 transition-colors'
          disabled={item.quantity >= item.variant.inventory_quantity}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className='p-1 text-gray-400 hover:text-red-500 transition-colors'
      >
        <X size={20} />
      </button>
    </div>
  );
};
