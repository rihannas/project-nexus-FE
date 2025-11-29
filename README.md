# AfriClothing E-Commerce Platform

A modern, responsive e-commerce web application for African clothing and fashion, built with React, TypeScript, and Redux Toolkit.

## 🎯 Project Overview

AfriClothing is a full-featured online store specializing in authentic African fashion. The platform showcases traditional and contemporary African clothing, allowing customers to browse, search, filter, and purchase products with an intuitive user experience.

## ✨ Features

### Core E-Commerce Functionality

- **Product Catalog** – Browse products with pagination and search
- **Category Filtering** – Filter products by countries/categories
- **Price Range Filtering** – Interactive sliders for price
- **Size Filtering** – S / M / L / XL / XXL
- **Product Search** – Real-time search with debouncing
- **Product Details** – Image gallery + full details
- **Shopping Cart** – Add/remove/edit items
- **User Authentication** – Login/register with JWT

### User Experience

- **Responsive Design** (mobile-first)
- **Modern UI** with African-inspired colors
- **Optimized Performance** with Redux + React Query
- **Intuitive Navigation** including breadcrumbs

### Technical Features

- **TypeScript** for type safety
- **Redux Toolkit** for predictable state management
- **RESTful API** integration
- **Real-time filtering/search**

## 🛠 Tech Stack

### Frontend

- React 18
- TypeScript
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios
- Lucide React

### Backend Integration

- Django REST Framework
- JWT Authentication
- RESTful API architecture

## 🏗 Project Structure

src/
├── api/
│ ├── client.ts
│ ├── products.ts
│ ├── categories.ts
│ └── auth.ts
├── components/
│ ├── layout/
│ ├── products/
│ ├── cart/
│ └── common/
├── pages/
│ ├── Home.tsx
│ ├── Shop.tsx
│ ├── ProductDetail.tsx
│ ├── Cart.tsx
│ ├── Login.tsx
│ └── CategoryPage.tsx
├── store/
│ ├── store.ts
│ └── slices/
│ ├── productsSlice.ts
│ ├── cartSlice.ts
│ ├── authSlice.ts
│ └── categoriesSlice.ts
├── types/
├── hooks/
└── utils/

## 🚀 Getting Started

### Prerequisites

- Node.js v16+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd africlothing-frontend

   ```

2. **Install dependencies**

   ```bash
   npm install

   ```

3. **Set environment variables**

   ```bash
   Create a .env file:
   VITE_API_BASE_URL=https://africlothing-api-1.onrender.com

   ```

4. **Run development server**

   ```bash
   npm run dev

   ```

5. **Run development server**
   ```bash
   http://localhost:3000

   ```

## 📱 Pages & Routes

| Route             | Component       | Description                                          |
| ----------------- | --------------- | ---------------------------------------------------- |
| `/`               | `Home`          | Landing page with hero section and featured products |
| `/shop`           | `Shop`          | All products with filtering and search functionality |
| `/product/:slug`  | `ProductDetail` | Individual product details page with image gallery   |
| `/category/:slug` | `CategoryPage`  | Products filtered by specific category               |
| `/cart`           | `Cart`          | Shopping cart management and checkout                |
| `/login`          | `Login`         | User authentication and registration                 |
| `/search`         | `SearchResults` | Search results page with query parameters            |

## 🔌 API Integration

### Endpoints

| Method | Endpoint                      | Description                                     |
| ------ | ----------------------------- | ----------------------------------------------- |
| `GET`  | `/api/store/products/`        | List all products with pagination and filtering |
| `GET`  | `/api/store/products/{slug}/` | Get detailed information for a specific product |
| `GET`  | `/api/store/categories/`      | List all available product categories           |
| `POST` | `/api/token/`                 | User authentication (JWT token generation)      |
| `POST` | `/api/token/refresh/`         | Refresh expired JWT tokens                      |

### Filter Parameters

| Parameter        | Type   | Description                      | Example                   |
| ---------------- | ------ | -------------------------------- | ------------------------- |
| `category__slug` | string | Filter products by category slug | `category__slug=ethiopia` |
| `min_price`      | number | Minimum price filter             | `min_price=50`            |
| `max_price`      | number | Maximum price filter             | `max_price=200`           |
| `variants__size` | string | Filter by product size           | `variants__size=M`        |
| `search`         | string | Text search across products      | `search=dress`            |
| `ordering`       | string | Sort products by field           | `ordering=-created_at`    |
| `page`           | number | Pagination page number           | `page=2`                  |
| `page_size`      | number | Number of items per page         | `page_size=12`            |

### Example API Calls

```bash
# Get all products with pagination
GET /api/store/products/?page=1&page_size=12

# Filter products by category and price
GET /api/store/products/?category__slug=ethiopia&min_price=100&max_price=500

# Search for products with size filter
GET /api/store/products/?search=dress&variants__size=M&ordering=price

# Get products sorted by newest first
GET /api/store/products/?ordering=-created_at



This markdown format provides:

- **Clean tables** for easy readability
- **Proper column alignment** with headers
- **Detailed descriptions** for each route and parameter
- **Example usage** with code blocks
- **Consistent formatting** throughout
- **Emoji icons** for visual organization

You can copy and paste this directly into your README file!
```
