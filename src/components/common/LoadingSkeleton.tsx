import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden animate-pulse'>
      <div className='bg-gray-200 h-64 w-full'></div>
      <div className='p-4'>
        <div className='bg-gray-200 h-4 rounded w-3/4 mb-2'></div>
        <div className='bg-gray-200 h-3 rounded w-1/2 mb-2'></div>
        <div className='bg-gray-200 h-3 rounded w-1/4'></div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton: React.FC<{ count?: number }> = ({
  count = 8,
}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};
