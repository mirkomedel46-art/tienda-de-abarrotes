import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, User, Bell } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function ClientLayout() {
  const location = useLocation();
  const cart = useStore((state) => state.cart);
  
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      {/* Top Header for Mobile / Desktop Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-green-600">
          AbarrotesApp
        </Link>
        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-900 relative">
            <Bell className="w-6 h-6" />
          </button>
          <Link to="/cart" className="text-gray-600 hover:text-gray-900 relative md:hidden">
            <ShoppingCart className="w-6 h-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>
          <Link to="/admin" className="hidden md:block text-sm font-medium text-blue-600 hover:underline">
            Ir a Panel Admin
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4">
        <Outlet />
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center h-16 z-50">
        <Link to="/" className={`flex flex-col items-center ${location.pathname === '/' ? 'text-green-600' : 'text-gray-500'}`}>
          <Home className="w-6 h-6" />
          <span className="text-[10px] mt-1">Inicio</span>
        </Link>
        <Link to="/search" className={`flex flex-col items-center ${location.pathname === '/search' ? 'text-green-600' : 'text-gray-500'}`}>
          <Search className="w-6 h-6" />
          <span className="text-[10px] mt-1">Buscar</span>
        </Link>
        <Link to="/cart" className={`flex flex-col items-center relative ${location.pathname === '/cart' ? 'text-green-600' : 'text-gray-500'}`}>
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1">Carrito</span>
        </Link>
        <Link to="/order/1042" className={`flex flex-col items-center ${location.pathname.startsWith('/order') ? 'text-green-600' : 'text-gray-500'}`}>
          <User className="w-6 h-6" />
          <span className="text-[10px] mt-1">Pedidos</span>
        </Link>
      </nav>
    </div>
  );
}
