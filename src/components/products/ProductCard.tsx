import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const mainImage = product.main_image;

  const minPrice = product.price_range?.min || 0;
  const maxPrice = product.price_range?.max || 0;
  const hasMultiplePrices = minPrice !== maxPrice;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Create a temporary variant since your API might not have variants in list view
    const tempVariant = {
      id: `temp-${product.id}-${product.available_sizes?.[0] || 'M'}`,
      size: product.available_sizes?.[0] || 'M',
      price: minPrice.toString(),
      inventory_quantity: 10, // Default quantity since we don't have variant-specific inventory
    };

    dispatch(
      addToCart({
        product,
        variant: tempVariant,
        quantity: 1,
      })
    );
  };

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 card-hover group'>
      <div className='relative overflow-hidden'>
        <Link to={`/product/${product.slug}`}>
          {mainImage ? (
            <img
              src={mainImage}
              alt={product.name}
              className='w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300'
            />
          ) : (
            <div className='w-full h-64 bg-gradient-to-br from-primary-orange to-primary-red flex items-center justify-center group-hover:scale-105 transition-transform duration-300'>
              <div className='text-white text-center p-4'>
                <div className='text-4xl mb-2'>👗</div>
                <p className='text-sm font-medium'>{product.name}</p>
                <p className='text-xs opacity-80 mt-1'>Image Coming Soon</p>
              </div>
            </div>
          )}
        </Link>

        {/* Quick Actions */}
        <div className='absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
          <button className='bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors'>
            <Heart
              size={16}
              className='text-gray-600'
            />
          </button>
          <Link
            to={`/product/${product.slug}`}
            className='bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors'
          >
            <Eye
              size={16}
              className='text-gray-600'
            />
          </Link>
        </div>

        {/* Category Badge */}
        <div className='absolute top-3 left-3'>
          <span className='bg-primary-orange text-white px-2 py-1 rounded-full text-xs font-medium'>
            {product.category.name}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className='absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-primary-orange text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center space-x-2 shadow-lg'
        >
          <ShoppingCart size={16} />
          <span className='text-sm font-medium'>Add to Cart</span>
        </button>
      </div>

      <div className='p-4'>
        <Link to={`/product/${product.slug}`}>
          <h3 className='font-semibold text-gray-900 mb-2 hover:text-primary-orange transition-colors line-clamp-2'>
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className='flex items-center justify-between mb-3'>
          <div className='flex items-center space-x-2'>
            <span className='text-lg font-bold text-gray-900'>
              ${minPrice.toFixed(2)}
            </span>
            {hasMultiplePrices && (
              <span className='text-sm text-gray-500'>
                - ${maxPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Available Sizes */}
        {product.available_sizes && product.available_sizes.length > 0 && (
          <div className='flex items-center space-x-1 mb-2'>
            <span className='text-xs text-gray-500'>Sizes:</span>
            <div className='flex space-x-1'>
              {product.available_sizes.slice(0, 4).map((size) => (
                <span
                  key={size}
                  className='text-xs bg-gray-100 px-2 py-1 rounded border uppercase'
                >
                  {size}
                </span>
              ))}
              {product.available_sizes.length > 4 && (
                <span className='text-xs text-gray-500'>
                  +{product.available_sizes.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Stock Status - Default to In Stock since we don't have variant inventory in list view */}
        <div className='flex items-center justify-between text-sm'>
          <span className='text-green-600'>In Stock</span>
        </div>
      </div>
    </div>
  );
};
