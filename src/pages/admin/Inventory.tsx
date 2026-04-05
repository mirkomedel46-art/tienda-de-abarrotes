import { useState } from 'react';
import { Search, Camera, Plus, Edit2 } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function Inventory() {
  const products = useStore(state => state.products);
  const updateProductStock = useStore(state => state.updateProductStock);
  const [query, setQuery] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.sku.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Inventario</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700">
            <Camera className="w-4 h-4" /> Escanear
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Nuevo
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre o SKU..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">SKU / Producto</th>
                <th className="px-4 py-3 text-right">Precio</th>
                <th className="px-4 py-3 text-center">Stock</th>
                <th className="px-4 py-3 text-center">Mínimo</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded object-cover" />
                      <div>
                        <p className="font-medium text-slate-800">{product.name}</p>
                        <p className="text-xs text-slate-500">{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-slate-800">
                    ${product.price.toLocaleString('es-CL')}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <input 
                        type="number" 
                        value={product.stock}
                        onChange={(e) => updateProductStock(product.id, parseInt(e.target.value) || 0)}
                        className={`w-16 text-center py-1 border rounded-md text-sm ${
                          product.stock === 0 ? 'bg-red-50 border-red-200 text-red-700' :
                          product.stock <= product.minStock ? 'bg-orange-50 border-orange-200 text-orange-700' :
                          'bg-white border-slate-200'
                        }`}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-slate-500">
                    {product.minStock}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1 text-slate-400 hover:text-blue-600">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="p-8 text-center text-slate-500">No se encontraron productos</div>
          )}
        </div>
      </div>
    </div>
  );
}
