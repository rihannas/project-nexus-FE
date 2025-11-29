import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { ProductGridSkeleton } from '../common/LoadingSkeleton';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  emptyMessage = 'No products found',
}) => {
  if (loading) {
    return <ProductGridSkeleton />;
  }

  if (products.length === 0) {
    return (
      <div className='text-center py-12'>
        <div className='text-gray-400 text-6xl mb-4'>🛍️</div>
        <h3 className='text-lg font-semibold text-gray-900 mb-2'>
          {emptyMessage}
        </h3>
        <p className='text-gray-500'>
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};
