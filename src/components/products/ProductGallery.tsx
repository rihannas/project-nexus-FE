import React, { useState } from 'react';
import { ZoomIn, X } from 'lucide-react';
import { ProductImage } from '../../types';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const mainImage = images[selectedImageIndex] || images[0];

  if (!images || images.length === 0) {
    return (
      <div className='bg-gray-100 rounded-lg h-96 flex items-center justify-center'>
        <span className='text-gray-400'>No image available</span>
      </div>
    );
  }

  return (
    <>
      <div className='space-y-4'>
        {/* Main Image */}
        <div
          className='bg-gray-100 rounded-lg overflow-hidden cursor-zoom-in relative group'
          onClick={() => setIsLightboxOpen(true)}
        >
          <img
            src={mainImage.image}
            alt={mainImage.alt_text || productName}
            className='w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300'
          />
          <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center'>
            <ZoomIn
              size={32}
              className='text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'
            />
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className='flex space-x-2 overflow-x-auto'>
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden ${
                  selectedImageIndex === index
                    ? 'border-primary-orange'
                    : 'border-transparent'
                }`}
              >
                <img
                  src={image.image}
                  alt={image.alt_text || `${productName} view ${index + 1}`}
                  className='w-full h-full object-cover'
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4'>
          <button
            onClick={() => setIsLightboxOpen(false)}
            className='absolute top-4 right-4 text-white hover:text-gray-300 z-10'
          >
            <X size={32} />
          </button>

          <div className='max-w-4xl max-h-full'>
            <img
              src={mainImage.image}
              alt={mainImage.alt_text || productName}
              className='max-w-full max-h-full object-contain'
            />
          </div>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setSelectedImageIndex(
                    selectedImageIndex > 0
                      ? selectedImageIndex - 1
                      : images.length - 1
                  )
                }
                className='absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-2xl'
              >
                ‹
              </button>
              <button
                onClick={() =>
                  setSelectedImageIndex(
                    selectedImageIndex < images.length - 1
                      ? selectedImageIndex + 1
                      : 0
                  )
                }
                className='absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-2xl'
              >
                ›
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};
