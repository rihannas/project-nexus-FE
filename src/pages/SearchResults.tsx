import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { fetchProducts, setFilters } from '../store/slices/productsSlice';
import { ProductGrid } from '../components/products/ProductGrid';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { Search, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

export const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const dispatch = useDispatch();

  const {
    items: products,
    loading,
    pagination,
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (query) {
      dispatch(setFilters({ search: query }));
      dispatch(
        fetchProducts({
          search: query,
          page_size: 12,
        }) as any
      );
    }
  }, [dispatch, query]);

  const breadcrumbItems = [{ label: `Search: "${query}"` }];

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <Breadcrumb items={breadcrumbItems} />

        <div className='text-center mb-12'>
          <div className='flex items-center justify-center mb-4'>
            <Search
              size={32}
              className='text-gray-400 mr-3'
            />
            <h1 className='text-3xl font-heading font-bold text-gray-900'>
              Search Results
            </h1>
          </div>

          <p className='text-lg text-gray-600 mb-2'>
            {query
              ? `Results for "${query}"`
              : 'Enter a search term to find products'}
          </p>

          {query && (
            <p className='text-sm text-gray-500'>
              Found {pagination.count} product
              {pagination.count !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {!query ? (
          <div className='text-center py-12'>
            <div className='text-gray-400 text-6xl mb-4'>🔍</div>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>
              Enter a search term
            </h3>
            <p className='text-gray-500 mb-6'>
              Try searching for products, categories, or brands
            </p>
            <Link to='/shop'>
              <Button icon={ArrowLeft}>Back to Shop</Button>
            </Link>
          </div>
        ) : (
          <ProductGrid
            products={products}
            loading={loading}
            emptyMessage={`No products found for "${query}"`}
          />
        )}
      </div>
    </div>
  );
};
