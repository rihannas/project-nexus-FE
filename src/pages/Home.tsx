import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowRight, Star, Truck, Shield, Heart } from 'lucide-react';
import { RootState } from '../store/store';
import { fetchFeaturedProducts } from '../store/slices/productsSlice';
import { fetchCategories } from '../store/slices/categoriesSlice';
import { ProductGrid } from '../components/products/ProductGrid';
import { Button } from '../components/common/Button';

export const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { items: products, loading: productsLoading } = useSelector(
    (state: RootState) => state.products
  );
  const { items: categories, loading: categoriesLoading } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    dispatch(fetchFeaturedProducts() as any);
    dispatch(fetchCategories() as any);
  }, [dispatch]);

  const featuredCategories = categories.slice(0, 4);

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='bg-gradient-to-r from-primary-orange to-primary-red text-white py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-5xl md:text-6xl font-heading font-bold mb-6'>
              Discover African Elegance
            </h1>
            <p className='text-xl md:text-2xl mb-8 max-w-3xl mx-auto'>
              Embrace the vibrant colors and rich traditions of African fashion.
              Handcrafted clothing that tells a story with every thread.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link to='/shop'>
                <Button
                  size='lg'
                  className='bg-white text-primary-orange hover:bg-gray-100'
                >
                  Shop Collection
                  <ArrowRight
                    size={20}
                    className='ml-2'
                  />
                </Button>
              </Link>
              <Button
                variant='outline'
                size='lg'
                className='border-white text-white hover:bg-white hover:text-primary-orange'
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='bg-primary-orange rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
                <Truck
                  size={32}
                  className='text-white'
                />
              </div>
              <h3 className='font-heading font-semibold text-lg mb-2'>
                Free Shipping
              </h3>
              <p className='text-gray-600'>Free delivery on orders over $50</p>
            </div>

            <div className='text-center'>
              <div className='bg-secondary-brown rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
                <Shield
                  size={32}
                  className='text-white'
                />
              </div>
              <h3 className='font-heading font-semibold text-lg mb-2'>
                Quality Guarantee
              </h3>
              <p className='text-gray-600'>30-day money back guarantee</p>
            </div>

            <div className='text-center'>
              <div className='bg-primary-red rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
                <Heart
                  size={32}
                  className='text-white'
                />
              </div>
              <h3 className='font-heading font-semibold text-lg mb-2'>
                Handcrafted
              </h3>
              <p className='text-gray-600'>Authentic African craftsmanship</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-heading font-bold text-gray-900 mb-4'>
              Shop by Category
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Explore our diverse collection of authentic African clothing and
              accessories
            </p>
          </div>

          {!categoriesLoading && featuredCategories.length > 0 && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
              {featuredCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className='group relative overflow-hidden rounded-lg shadow-md card-hover'
                >
                  <div className='bg-gradient-to-br from-primary-orange to-primary-red h-64 flex items-center justify-center'>
                    <div className='text-center text-white p-6'>
                      <h3 className='font-heading font-semibold text-xl mb-2'>
                        {category.name}
                      </h3>
                      <p className='text-white text-opacity-90 text-sm mb-4'>
                        {category.description}
                      </p>
                      <span className='inline-block bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm'>
                        {category.product_count} items
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center mb-12'>
            <div>
              <h2 className='text-3xl font-heading font-bold text-gray-900 mb-4'>
                Featured Products
              </h2>
              <p className='text-gray-600'>
                Handpicked items from our collection
              </p>
            </div>
            <Link to='/shop'>
              <Button variant='outline'>
                View All
                <ArrowRight
                  size={16}
                  className='ml-2'
                />
              </Button>
            </Link>
          </div>

          <ProductGrid
            products={products}
            loading={productsLoading}
            emptyMessage='No featured products available'
          />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className='py-16 bg-secondary-brown text-white'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl font-heading font-bold mb-4'>
            Stay Connected
          </h2>
          <p className='text-white text-opacity-90 mb-8 max-w-2xl mx-auto'>
            Subscribe to our newsletter for updates on new arrivals, special
            offers, and African fashion inspiration.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto'>
            <input
              type='email'
              placeholder='Enter your email'
              className='flex-1 px-4 py-3 rounded-lg border border-white border-opacity-30 bg-white bg-opacity-10 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white'
            />
            <Button className='bg-white text-secondary-brown hover:bg-gray-100'>
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
