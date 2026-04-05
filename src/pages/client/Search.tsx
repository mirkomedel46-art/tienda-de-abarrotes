import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, Filter, AlertCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function Search() {
  const [query, setQuery] = useState('arroz');
  const products = useStore(state => state.products);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            autoFocus
          />
        </div>
        <button className="p-2 border border-gray-300 rounded-lg bg-white text-gray-600">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button className="px-3 py-1 text-sm border border-gray-300 rounded-full bg-white whitespace-nowrap">Precio ▼</button>
        <button className="px-3 py-1 text-sm border border-gray-300 rounded-full bg-white whitespace-nowrap">Marca ▼</button>
        <button className="px-3 py-1 text-sm border border-gray-300 rounded-full bg-white whitespace-nowrap">Ofertas ☐</button>
      </div>

      {/* Results */}
      <div className="space-y-3">
        {filteredProducts.map(p => (
          <Link key={p.id} to={`/product/${p.id}`} className="flex gap-4 p-3 bg-white border border-gray-200 rounded-xl">
            <img src={p.imageUrl} alt={p.name} className="w-20 h-20 object-cover rounded-lg" />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-medium text-gray-900 line-clamp-2">{p.name}</h3>
                <p className="text-sm text-gray-500">{p.unit}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-lg">${p.price.toLocaleString('es-CL')}</span>
                
                {p.stock > 5 ? (
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Stock: OK</span>
                ) : p.stock > 0 ? (
                  <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Stock: Bajo
                  </span>
                ) : (
                  <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">Agotado</span>
                )}
              </div>
            </div>
          </Link>
        ))}
        {filteredProducts.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No se encontraron resultados para "{query}"
          </div>
        )}
      </div>
    </div>
  );
}
