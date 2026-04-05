import { useState } from 'react';
import { Search, Filter, ChevronDown, Check, AlertCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { OrderStatus } from '../../types';

export function Orders() {
  const orders = useStore(state => state.orders);
  const updateOrderStatus = useStore(state => state.updateOrderStatus);
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const statusColors: Record<OrderStatus, string> = {
    recibido: 'bg-blue-50 text-blue-700 border-blue-200',
    preparando: 'bg-orange-50 text-orange-700 border-orange-200',
    en_camino: 'bg-purple-50 text-purple-700 border-purple-200',
    entregado: 'bg-green-50 text-green-700 border-green-200',
  };

  const statusLabels: Record<OrderStatus, string> = {
    recibido: 'Recibido',
    preparando: 'Preparando',
    en_camino: 'En Camino',
    entregado: 'Entregado',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Pedidos</h1>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por ID, cliente..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${filter === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              Todos
            </button>
            {(Object.keys(statusLabels) as OrderStatus[]).map(status => (
              <button 
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${filter === status ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {statusLabels[status]}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredOrders.map(order => (
            <div key={order.id} className="p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
              {/* Order Info */}
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Pedido #{order.id}</h3>
                    <p className="text-sm text-slate-500">
                      {new Date(order.createdAt).toLocaleString('es-CL')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-800">${order.total.toLocaleString('es-CL')}</p>
                    <p className="text-xs text-slate-500">{order.paymentMethod}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="font-medium text-slate-800 mb-1">Cliente</p>
                    <p className="text-slate-600">{order.customerName}</p>
                    <p className="text-slate-600">{order.customerPhone}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="font-medium text-slate-800 mb-1">Entrega</p>
                    <p className="text-slate-600">{order.deliveryWindow}</p>
                    <p className="text-slate-600 truncate">{order.deliveryAddress}</p>
                  </div>
                </div>

                {order.replacementsPending && order.replacementsPending > 0 && (
                  <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-orange-800">Requiere atención</p>
                      <p className="text-xs text-orange-700">Hay {order.replacementsPending} productos sin stock que requieren sustitución.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Items & Actions */}
              <div className="w-full lg:w-72 flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-slate-200 pt-4 lg:pt-0 lg:pl-6">
                <div>
                  <p className="font-medium text-slate-800 mb-2 text-sm">Productos ({order.items.length})</p>
                  <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-slate-600 truncate pr-2">{item.quantity}x {item.product.name}</span>
                        <span className="text-slate-800 font-medium">${(item.product.price * item.quantity).toLocaleString('es-CL')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <p className="text-xs text-slate-500 mb-1 uppercase font-medium">Cambiar Estado</p>
                  <select 
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                    className={`w-full p-2 border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${statusColors[order.status]}`}
                  >
                    <option value="recibido">Recibido</option>
                    <option value="preparando">Preparando (Picking)</option>
                    <option value="en_camino">En Camino (Despacho)</option>
                    <option value="entregado">Entregado</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
          {filteredOrders.length === 0 && (
            <div className="p-8 text-center text-slate-500">No se encontraron pedidos</div>
          )}
        </div>
      </div>
    </div>
  );
}
