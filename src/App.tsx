import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { CategoryPage } from './pages/CategoryPage';
import { SearchResults } from './pages/SearchResults';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';

function App() {
  return (
    <Router>
      <div className='App min-h-screen flex flex-col'>
        <Header />
        <main className='flex-1'>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/shop'
              element={<Shop />}
            />
            <Route
              path='/product/:slug'
              element={<ProductDetail />}
            />
            <Route
              path='/category/:slug'
              element={<CategoryPage />}
            />
            <Route
              path='/search'
              element={<SearchResults />}
            />
            <Route
              path='/cart'
              element={<Cart />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
