import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { fetchProducts, setFilters } from '../store/slices/productsSlice';
import { fetchCategories } from '../store/slices/categoriesSlice';
import { ProductGrid } from '../components/products/ProductGrid';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { Button } from '../components/common/Button';
import { ArrowLeft } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch();

  const {
    items: products,
    loading,
    pagination,
  } = useSelector((state: RootState) => state.products);
  const { items: categories, loading: categoriesLoading } = useSelector(
    (state: RootState) => state.categories
  );

  // Find the category
  const category = categories.find((c) => c.slug === slug);

  useEffect(() => {
    // Always fetch categories when component mounts
    dispatch(fetchCategories() as any);
  }, [dispatch]);

  useEffect(() => {
    if (slug) {
      dispatch(setFilters({ category: slug, search: '' }));
      dispatch(
        fetchProducts({
          category__slug: slug,
          page_size: 12,
        }) as any
      );
    }
  }, [dispatch, slug]);

  // Get other categories to display (excluding the current one)
  const otherCategories = categories
    .filter((cat) => cat.slug !== slug)
    .slice(0, 3);

  // Show loading state while categories are being fetched
  if (categoriesLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-primary-orange'></div>
      </div>
    );
  }

  // Only show "not found" if categories are loaded but the specific category isn't found
  if (!category && !categoriesLoading && categories.length > 0) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>
            Category Not Found
          </h2>
          <p className='text-gray-600 mb-4'>
            The category "{slug}" doesn't exist.
          </p>
          <Link to='/shop'>
            <Button icon={ArrowLeft}>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Shop', href: '/shop' },
    { label: category?.name || 'Category' }, // Changed from 'Loading...' to 'Category'
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <Breadcrumb items={breadcrumbItems} />

        {/* Show loading state for category */}
        {!category && categoriesLoading && (
          <div className='text-center mb-12'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary-orange mx-auto mb-4'></div>
            <p>Loading category...</p>
          </div>
        )}

        {/* Category Header - Only show when category is found */}
        {category && (
          <div className='text-center mb-12'>
            <h1 className='text-4xl font-heading font-bold text-gray-900 mb-4'>
              {category.name}
            </h1>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              {category.description}
            </p>
            <div className='mt-4 text-sm text-gray-500'>
              {pagination.count} products available
            </div>
          </div>
        )}

        {/* Products Grid */}
        <ProductGrid
          products={products}
          loading={loading}
          emptyMessage={`No products found in ${
            category?.name || 'this category'
          }`}
        />

        {/* Other Categories Section */}
        {otherCategories.length > 0 && (
          <section className='mt-16'>
            <h2 className='text-2xl font-heading font-bold text-gray-900 mb-8 text-center'>
              Explore Other Categories
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {otherCategories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className='group relative overflow-hidden rounded-lg shadow-md card-hover'
                >
                  <div className='bg-gradient-to-br from-primary-orange to-primary-red h-48 flex items-center justify-center'>
                    <div className='text-center text-white p-6'>
                      <h3 className='font-heading font-semibold text-xl mb-2'>
                        {cat.name}
                      </h3>
                      <p className='text-white text-opacity-90 text-sm mb-4'>
                        {cat.description}
                      </p>
                      <span className='inline-block bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm'>
                        {cat.product_count} items
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All Categories Button */}
            <div className='text-center mt-8'>
              <Link to='/shop'>
                <Button variant='outline'>View All Categories</Button>
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
