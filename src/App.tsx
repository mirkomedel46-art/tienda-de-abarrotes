/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClientLayout } from './components/layout/ClientLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Client Pages
import { Home } from './pages/client/Home';
import { Search } from './pages/client/Search';
import { ProductDetail } from './pages/client/ProductDetail';
import { Cart } from './pages/client/Cart';
import { Checkout } from './pages/client/Checkout';
import { OrderTracking } from './pages/client/OrderTracking';

// Admin Pages
import { Dashboard } from './pages/admin/Dashboard';
import { Inventory } from './pages/admin/Inventory';
import { Orders } from './pages/admin/Orders';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order/:id" element={<OrderTracking />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
