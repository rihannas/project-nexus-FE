import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className='flex items-center space-x-2 text-sm text-gray-500 mb-6'>
      <Link
        to='/'
        className='hover:text-primary-orange transition-colors'
      >
        Home
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight
            size={16}
            className='text-gray-400'
          />
          {item.href ? (
            <Link
              to={item.href}
              className='hover:text-primary-orange transition-colors'
            >
              {item.label}
            </Link>
          ) : (
            <span className='text-gray-700'>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
