import React, { useState, useEffect } from 'react';
import { X, Filter } from 'lucide-react';
import { Category } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setFilters, clearFilters } from '../../store/slices/productsSlice';

interface ProductFiltersProps {
  categories: Category[];
  isOpen: boolean;
  onClose: () => void;
  onPriceRangeChange: (min: number, max: number) => void;
  onClearFilters: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  isOpen,
  onClose,
  onPriceRangeChange,
  onClearFilters,
}) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.products);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);

  // Ensure categories is always an array
  const safeCategories = Array.isArray(categories) ? categories : [];

  // Initialize slider values from filters
  useEffect(() => {
    setMinPrice(filters.minPrice);
    setMaxPrice(filters.maxPrice);
  }, [filters.minPrice, filters.maxPrice]);

  const handleCategoryChange = (categorySlug: string) => {
    dispatch(
      setFilters({
        category: filters.category === categorySlug ? '' : categorySlug,
      })
    );
  };

  const handleSizeChange = (size: string) => {
    dispatch(setFilters({ size: filters.size === size ? '' : size }));
  };

  const handleSliderMouseDown = (thumb: 'min' | 'max') => {
    setIsDragging(thumb);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const slider = document.querySelector('.price-slider') as HTMLElement;
      if (!slider) return;

      const rect = slider.getBoundingClientRect();
      const percentage = Math.max(
        0,
        Math.min(1, (e.clientX - rect.left) / rect.width)
      );
      const value = Math.round(percentage * 1000);

      if (isDragging === 'min') {
        const newMin = Math.min(value, maxPrice - 10);
        setMinPrice(newMin);
        onPriceRangeChange(newMin, maxPrice);
      } else {
        const newMax = Math.max(value, minPrice + 10);
        setMaxPrice(newMax);
        onPriceRangeChange(minPrice, newMax);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, minPrice, maxPrice, onPriceRangeChange]);

  const handleClearAllFilters = () => {
    dispatch(clearFilters());
    setMinPrice(0);
    setMaxPrice(1000);
    onClearFilters();
  };

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const FilterContent = () => (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold flex items-center'>
          <Filter
            size={20}
            className='mr-2'
          />
          Filters
        </h3>
        <button
          onClick={onClose}
          className='md:hidden p-1 hover:bg-gray-100 rounded'
        >
          <X size={20} />
        </button>
      </div>

      {/* Categories as Buttons */}
      <div>
        <h4 className='font-medium mb-3'>Categories</h4>
        <div className='flex flex-wrap gap-2'>
          {safeCategories.length > 0 ? (
            safeCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.slug)}
                className={`px-3 py-2 border rounded-lg text-sm transition-colors ${
                  filters.category === category.slug
                    ? 'bg-primary-orange text-white border-primary-orange'
                    : 'border-gray-300 bg-white text-gray-900 hover:border-primary-orange'
                }`}
              >
                {category.name} ({category.product_count || 0})
              </button>
            ))
          ) : (
            <p className='text-sm text-gray-500'>No categories available</p>
          )}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <h4 className='font-medium mb-3'>
          Price Range: ${minPrice} - ${maxPrice}
        </h4>
        <div className='space-y-4'>
          {/* Custom Slider */}
          <div className='relative price-slider'>
            {/* Background Track */}
            <div className='h-2 bg-gray-200 rounded-full'></div>

            {/* Active Range Track */}
            <div
              className='absolute top-0 h-2 bg-primary-orange rounded-full'
              style={{
                left: `${(minPrice / 1000) * 100}%`,
                width: `${((maxPrice - minPrice) / 1000) * 100}%`,
              }}
            ></div>

            {/* Min Price Thumb */}
            <div
              className={`absolute top-1/2 w-4 h-4 bg-primary-orange border-2 border-white rounded-full shadow-lg transform -translate-y-1/2 cursor-grab ${
                isDragging === 'min'
                  ? 'cursor-grabbing scale-110'
                  : 'hover:scale-110'
              }`}
              style={{ left: `${(minPrice / 1000) * 100}%` }}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSliderMouseDown('min');
              }}
            ></div>

            {/* Max Price Thumb */}
            <div
              className={`absolute top-1/2 w-4 h-4 bg-primary-orange border-2 border-white rounded-full shadow-lg transform -translate-y-1/2 cursor-grab ${
                isDragging === 'max'
                  ? 'cursor-grabbing scale-110'
                  : 'hover:scale-110'
              }`}
              style={{ left: `${(maxPrice / 1000) * 100}%` }}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSliderMouseDown('max');
              }}
            ></div>
          </div>

          {/* Price Labels */}
          <div className='flex justify-between text-xs text-gray-500'>
            <span>$0</span>
            <span>$500</span>
            <span>$1000</span>
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h4 className='font-medium mb-3'>Sizes</h4>
        <div className='flex flex-wrap gap-2'>
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              className={`px-3 py-2 border rounded-lg text-sm transition-colors ${
                filters.size === size
                  ? 'bg-primary-orange text-white border-primary-orange'
                  : 'border-gray-300 bg-white text-gray-900 hover:border-primary-orange'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={handleClearAllFilters}
        className='w-full py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors'
      >
        Clear All Filters
      </button>

      {/* Active Filter Display */}
      {(filters.category ||
        filters.size ||
        filters.minPrice > 0 ||
        filters.maxPrice < 1000) && (
        <div className='bg-blue-50 border border-blue-200 rounded-lg p-3'>
          <h4 className='font-medium text-blue-900 mb-2'>Active Filters:</h4>
          <div className='flex flex-wrap gap-2'>
            {filters.category && (
              <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs'>
                Category:{' '}
                {safeCategories.find((c) => c.slug === filters.category)?.name}
              </span>
            )}
            {filters.size && (
              <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs'>
                Size: {filters.size}
              </span>
            )}
            {(filters.minPrice > 0 || filters.maxPrice < 1000) && (
              <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs'>
                Price: ${filters.minPrice} - ${filters.maxPrice}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden'
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed md:static inset-y-0 left-0 transform 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300 ease-in-out
        w-80 md:w-64 bg-white p-6 border-r border-gray-200 
        h-screen md:h-auto overflow-y-auto z-50
      `}
      >
        <FilterContent />
      </div>
    </>
  );
};
