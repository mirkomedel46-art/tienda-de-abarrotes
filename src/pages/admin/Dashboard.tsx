import { Link } from 'react-router-dom';
import { ShoppingBag, AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function Dashboard() {
  const orders = useStore(state => state.orders);
  const products = useStore(state => state.products);

  const activeOrders = orders.filter(o => o.status !== 'entregado');
  const lowStockProducts = products.filter(p => p.stock <= p.minStock);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat Cards */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Pedidos Activos</p>
            <p className="text-2xl font-bold text-slate-800">{activeOrders.length}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Alertas de Stock</p>
            <p className="text-2xl font-bold text-slate-800">{lowStockProducts.length}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Ventas Hoy</p>
            <p className="text-2xl font-bold text-slate-800">${orders.reduce((acc, o) => acc + o.total, 0).toLocaleString('es-CL')}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h2 className="font-bold text-slate-800">Pedidos Recientes</h2>
            <Link to="/admin/orders" className="text-sm text-blue-600 hover:underline">Ver todos</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {activeOrders.slice(0, 5).map(order => (
              <div key={order.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">#{order.id} - {order.customerName}</p>
                    <p className="text-xs text-slate-500">{order.items.length} productos • {order.deliveryWindow}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded uppercase">
                    {order.status}
                  </span>
                  <p className="text-sm font-bold mt-1">${order.total.toLocaleString('es-CL')}</p>
                </div>
              </div>
            ))}
            {activeOrders.length === 0 && (
              <div className="p-8 text-center text-slate-500">No hay pedidos activos</div>
            )}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h2 className="font-bold text-slate-800">Alertas de Stock</h2>
            <Link to="/admin/inventory" className="text-sm text-blue-600 hover:underline">Ver inventario</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {lowStockProducts.slice(0, 5).map(product => (
              <div key={product.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded object-cover" />
                  <div>
                    <p className="font-medium text-slate-800">{product.name}</p>
                    <p className="text-xs text-slate-500">SKU: {product.sku}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                    product.stock === 0 ? 'bg-red-50 text-red-700' : 'bg-orange-50 text-orange-700'
                  }`}>
                    {product.stock} en stock (Min: {product.minStock})
                  </span>
                </div>
              </div>
            ))}
            {lowStockProducts.length === 0 && (
              <div className="p-8 text-center text-slate-500">No hay alertas de stock</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
