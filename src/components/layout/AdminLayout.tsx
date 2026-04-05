import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Store } from 'lucide-react';

export function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Store className="w-6 h-6" />
            Admin Panel
          </h1>
          <Link to="/" className="text-xs text-slate-400 hover:text-white md:hidden">
            Volver a Tienda
          </Link>
        </div>
        
        <nav className="flex-1 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          <Link 
            to="/admin" 
            className={`flex items-center gap-3 px-3 py-2 rounded-md whitespace-nowrap ${location.pathname === '/admin' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link 
            to="/admin/orders" 
            className={`flex items-center gap-3 px-3 py-2 rounded-md whitespace-nowrap ${location.pathname === '/admin/orders' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <ShoppingBag className="w-5 h-5" />
            Pedidos
          </Link>
          <Link 
            to="/admin/inventory" 
            className={`flex items-center gap-3 px-3 py-2 rounded-md whitespace-nowrap ${location.pathname === '/admin/inventory' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Package className="w-5 h-5" />
            Inventario
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800 hidden md:block">
          <Link to="/" className="text-sm text-slate-400 hover:text-white flex items-center gap-2">
            <Store className="w-4 h-4" />
            Volver a Tienda
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
