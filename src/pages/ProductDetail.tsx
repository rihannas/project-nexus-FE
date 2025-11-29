import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { fetchProduct } from '../store/slices/productsSlice';
import { addToCart } from '../store/slices/cartSlice';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { ProductGallery } from '../components/products/ProductGallery';
import { ProductGrid } from '../components/products/ProductGrid';
import { Button } from '../components/common/Button';
import { Heart, Share2, Truck, Shield, ArrowLeft } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch();
  const { items: products } = useSelector((state: RootState) => state.products);
  const product = useSelector((state: RootState) =>
    state.products.items.find((p) => p.slug === slug)
  );
  const loading = useSelector((state: RootState) => state.products.loading);

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (slug && !product) {
      dispatch(fetchProduct(slug) as any);
    }
  }, [slug, product, dispatch]);

  useEffect(() => {
    if (product?.available_sizes?.length) {
      setSelectedSize(product.available_sizes[0]);
    }
  }, [product]);

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-primary-orange'></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>
            Product Not Found
          </h2>
          <Link to='/shop'>
            <Button icon={ArrowLeft}>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Safe access to variants - provide empty array if undefined
  const variants = product.variants || [];

  // Use price from price_range if variants are not available
  const price = product.price_range?.min || 0;

  // Default to in stock since we don't have variant inventory data
  const inStock = true;

  const relatedProducts = products
    .filter(
      (p) => p.category.slug === product.category.slug && p.id !== product.id
    )
    .slice(0, 4);

  const handleAddToCart = () => {
    // Create a temporary variant since your API might not have variants in detail view
    const tempVariant = {
      id: `temp-${product.id}-${selectedSize}`,
      size: selectedSize,
      price: price.toString(),
      inventory_quantity: 10,
    };

    dispatch(
      addToCart({
        product,
        variant: tempVariant,
        quantity,
      })
    );
  };

  const breadcrumbItems = [
    {
      label: product.category.name,
      href: `/category/${product.category.slug}`,
    },
    { label: product.name },
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <Breadcrumb items={breadcrumbItems} />

        <div className='lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start'>
          {/* Image gallery */}
          <div className='flex-1'>
            {product.images && product.images.length > 0 ? (
              <ProductGallery
                images={product.images}
                productName={product.name}
              />
            ) : (
              <div className='bg-gradient-to-br from-primary-orange to-primary-red rounded-lg h-96 flex items-center justify-center text-white text-center'>
                <div>
                  <div className='text-6xl mb-4'>👗</div>
                  <p className='text-xl font-semibold'>{product.name}</p>
                  <p className='text-sm opacity-80 mt-2'>
                    Product Image Coming Soon
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Product info */}
          <div className='mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0'>
            <div className='bg-white rounded-lg shadow-sm border p-6'>
              {/* Product Header */}
              <div className='flex items-center justify-between mb-4'>
                <h1 className='text-3xl font-heading font-bold text-gray-900'>
                  {product.name}
                </h1>
                <div className='flex space-x-3'>
                  <button className='p-2 text-gray-400 hover:text-gray-500'>
                    <Heart size={24} />
                  </button>
                  <button className='p-2 text-gray-400 hover:text-gray-500'>
                    <Share2 size={24} />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className='mb-4'>
                <h2 className='sr-only'>Product information</h2>
                <p className='text-3xl text-gray-900 font-bold'>
                  ${price.toFixed(2)}
                </p>
              </div>

              {/* Reviews */}
              <div className='mb-6'>
                <div className='flex items-center'>
                  <div className='flex items-center'>
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <svg
                        key={rating}
                        className='text-yellow-400 h-5 w-5 flex-shrink-0'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </svg>
                    ))}
                  </div>
                  <p className='sr-only'>4 out of 5 stars</p>
                  <a
                    href='#'
                    className='ml-2 text-sm text-gray-500 hover:text-gray-700'
                  >
                    24 reviews
                  </a>
                </div>
              </div>

              {/* Description */}
              <div className='mb-6'>
                <h3 className='sr-only'>Description</h3>
                <div className='text-base text-gray-700'>
                  <p>{product.description || 'No description available.'}</p>
                </div>
              </div>

              {/* Size selection */}
              {product.available_sizes &&
                product.available_sizes.length > 0 && (
                  <div className='mb-6'>
                    <div className='flex items-center justify-between mb-3'>
                      <h3 className='text-sm text-gray-900 font-medium'>
                        Size
                      </h3>
                      <a
                        href='#'
                        className='text-sm text-primary-orange hover:text-primary-red'
                      >
                        Size guide
                      </a>
                    </div>

                    <div className='grid grid-cols-4 gap-2 sm:grid-cols-8 lg:grid-cols-4'>
                      {product.available_sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 ${
                            selectedSize === size
                              ? 'border-primary-orange bg-primary-orange text-white'
                              : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              {/* Quantity */}
              <div className='mb-4'>
                <div className='flex items-center space-x-4'>
                  <span className='text-sm font-medium text-gray-900'>
                    Quantity
                  </span>
                  <div className='flex items-center border border-gray-300 rounded-lg bg-white'>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className='p-2 hover:bg-gray-100 w-8 flex items-center justify-center'
                    >
                      -
                    </button>
                    <span className='px-4 py-2 w-12 text-center font-medium'>
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className='p-2 hover:bg-gray-100 w-8 flex items-center justify-center'
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Stock Status and Add to Cart Button */}
              <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center space-x-2'>
                  <span
                    className={`text-sm font-medium ${
                      inStock ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {inStock ? '✅ In Stock' : '❌ Out of Stock'}
                  </span>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={
                    !inStock ||
                    (product.available_sizes &&
                      product.available_sizes.length > 0 &&
                      !selectedSize)
                  }
                  className='flex-1 max-w-xs py-3'
                  size='lg'
                >
                  {inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>

              {/* Product details */}
              <section className='border-t pt-6'>
                <h3 className='text-lg font-medium text-gray-900 mb-3'>
                  Product Details
                </h3>
                <div className='space-y-3'>
                  <div className='flex items-center'>
                    <Truck
                      size={20}
                      className='text-gray-400 mr-3'
                    />
                    <span className='text-sm text-gray-600'>
                      Free shipping on orders over $50
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <Shield
                      size={20}
                      className='text-gray-400 mr-3'
                    />
                    <span className='text-sm text-gray-600'>
                      30-day return policy
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className='mt-16'>
            <h2 className='text-2xl font-heading font-bold text-gray-900 mb-8'>
              Related Products
            </h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </div>
    </div>
  );
};
