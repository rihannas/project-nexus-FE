import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { fetchProducts, setFilters } from '../store/slices/productsSlice';
import { fetchCategories } from '../store/slices/categoriesSlice';
import { ProductGrid } from '../components/products/ProductGrid';
import { ProductFilters } from '../components/products/ProductFilters';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { Button } from '../components/common/Button';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';

export const Shop: React.FC = () => {
  const dispatch = useDispatch();
  const { items, loading, pagination, filters } = useSelector(
    (state: RootState) => state.products
  );
  const { items: categories, loading: categoriesLoading } = useSelector(
    (state: RootState) => state.categories
  );
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const debouncedSearch = useDebounce(filters.search, 500);

  useEffect(() => {
    console.log('🔍 Shop - Categories data:', {
      categories,
      categoriesLoading,
      categoriesCount: categories.length,
      categoriesData: categories.map((c) => ({
        name: c.name,
        slug: c.slug,
        count: c.product_count,
      })),
    });
  }, [categories, categoriesLoading]);

  useEffect(() => {
    // Always fetch categories when component mounts
    console.log('🔄 Shop - Fetching categories...');
    dispatch(fetchCategories() as any);
  }, [dispatch]);

  useEffect(() => {
    const fetchParams: any = {
      page: 1,
      page_size: 12,
    };

    // Add search filter
    if (debouncedSearch) {
      fetchParams.search = debouncedSearch;
    }

    // Add category filter
    if (filters.category) {
      fetchParams.category__slug = filters.category;
    }

    // Add price filters
    if (filters.minPrice > 0) {
      fetchParams.min_price = filters.minPrice;
    }
    if (filters.maxPrice > 0 && filters.maxPrice < 1000) {
      fetchParams.max_price = filters.maxPrice;
    }

    // Add size filter
    if (filters.size) {
      fetchParams.variants__size = filters.size;
    }

    // Add ordering
    if (filters.ordering) {
      fetchParams.ordering = filters.ordering;
    }

    console.log('🔄 Fetching products with params:', fetchParams);

    dispatch(fetchProducts(fetchParams) as any);
  }, [
    dispatch,
    filters.category,
    filters.size,
    filters.ordering,
    debouncedSearch,
    filters.minPrice,
    filters.maxPrice,
  ]);

  const handlePageChange = (page: number) => {
    const fetchParams: any = {
      page,
      page_size: 12,
    };

    if (filters.search) fetchParams.search = filters.search;
    if (filters.category) fetchParams.category__slug = filters.category;
    if (filters.minPrice > 0) fetchParams.min_price = filters.minPrice;
    if (filters.maxPrice > 0 && filters.maxPrice < 1000)
      fetchParams.max_price = filters.maxPrice;
    if (filters.size) fetchParams.variants__size = filters.size;
    if (filters.ordering) fetchParams.ordering = filters.ordering;

    dispatch(fetchProducts(fetchParams) as any);
  };

  const handleSearchChange = (query: string) => {
    dispatch(setFilters({ search: query }));
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    dispatch(
      setFilters({
        minPrice: min,
        maxPrice: max,
      })
    );
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  // handling pagination

  const totalPages = Math.ceil(pagination.count / 12);

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Shop' }]} />

        {/* Header */}
        <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8'>
          <div>
            <h1 className='text-3xl font-heading font-bold text-gray-900 mb-2'>
              Shop All Products
            </h1>
            <p className='text-gray-600'>{pagination.count} products found</p>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 w-full lg:w-auto mt-4 lg:mt-0'>
            {/* Search */}
            <div className='relative'>
              <input
                type='text'
                placeholder='Search products...'
                value={filters.search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className='w-full lg:w-64 pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent'
              />
              <SlidersHorizontal
                size={20}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              />
            </div>

            {/* View Toggle */}
            <div className='flex items-center space-x-2 bg-white border border-gray-300 rounded-lg p-1'>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid'
                    ? 'bg-primary-orange text-white'
                    : 'text-gray-600 hover:text-primary-orange'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list'
                    ? 'bg-primary-orange text-white'
                    : 'text-gray-600 hover:text-primary-orange'
                }`}
              >
                <List size={20} />
              </button>
            </div>

            {/* Mobile Filter Button */}
            <Button
              onClick={() => setIsFiltersOpen(true)}
              className='lg:hidden'
              icon={Filter}
            >
              Filters
            </Button>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Filters Sidebar */}
          <div className='lg:w-64 flex-shrink-0'>
            <ProductFilters
              categories={categories} // Pass the actual categories array
              isOpen={isFiltersOpen}
              onClose={() => setIsFiltersOpen(false)}
              onPriceRangeChange={handlePriceRangeChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Products Grid */}
          <div className='flex-1'>
            <ProductGrid
              products={items}
              loading={loading}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className='flex justify-center items-center space-x-2 mt-12'>
                <Button
                  variant='outline'
                  disabled={!pagination.previous}
                  onClick={() => {
                    const previousPage = pagination.previous
                      ? parseInt(
                          new URL(pagination.previous).searchParams.get(
                            'page'
                          ) || '1'
                        )
                      : 1;
                    handlePageChange(previousPage - 1);
                  }}
                >
                  Previous
                </Button>

                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <Button
                      key={page}
                      variant={
                        page ===
                        parseInt(
                          new URL(pagination.next || '').searchParams.get(
                            'page'
                          ) || '2'
                        ) -
                          1
                          ? 'primary'
                          : 'outline'
                      }
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  );
                })}

                <Button
                  variant='outline'
                  disabled={!pagination.next}
                  onClick={() => {
                    const nextPage = pagination.next
                      ? parseInt(
                          new URL(pagination.next).searchParams.get('page') ||
                            '2'
                        )
                      : 2;
                    handlePageChange(nextPage);
                  }}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Add missing import
import { clearFilters } from '../store/slices/productsSlice';
