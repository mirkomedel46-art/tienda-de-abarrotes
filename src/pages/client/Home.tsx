import { Link } from 'react-router-dom';
import { Search as SearchIcon, MapPin } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function Home() {
  const products = useStore(state => state.products);
  const user = useStore(state => state.user);

  const offers = products.filter(p => p.isOffer);
  const bestSellers = products.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Delivery Info */}
      <div className="bg-green-50 p-3 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-green-800">
          <MapPin className="w-4 h-4" />
          <span>Entrega: Hoy 18:00-19:00</span>
        </div>
        <div className="text-sm font-medium text-green-800 truncate max-w-[120px]">
          {user?.addresses[0] || 'Seleccionar dirección'}
        </div>
      </div>

      {/* Search Bar (Fake, links to search) */}
      <Link to="/search" className="block">
        <div className="bg-white border border-gray-300 rounded-full py-3 px-4 flex items-center gap-3 text-gray-500 shadow-sm">
          <SearchIcon className="w-5 h-5" />
          <span>Buscar productos...</span>
        </div>
      </Link>

      {/* Categories */}
      <section>
        <h2 className="text-lg font-bold mb-3">Categorías</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {['Bebidas', 'Panadería', 'Lácteos', 'Aseo', 'Snacks'].map(cat => (
            <div key={cat} className="flex-shrink-0 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700">
              {cat}
            </div>
          ))}
        </div>
      </section>

      {/* Recompra Rápida */}
      <section>
        <h2 className="text-lg font-bold mb-3">Recompra rápida</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {bestSellers.map(p => (
            <Link key={p.id} to={`/product/${p.id}`} className="flex-shrink-0 w-24">
              <div className="bg-white border border-gray-200 rounded-lg p-2 flex flex-col items-center gap-2">
                <img src={p.imageUrl} alt={p.name} className="w-16 h-16 object-cover rounded-md" />
                <span className="text-xs text-center line-clamp-1">{p.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Offers Banner */}
      <section>
        <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-xl p-4 text-white flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg">Ofertas de hoy</h3>
            <p className="text-sm opacity-90">Hasta 40% de descuento</p>
          </div>
          <div className="bg-white text-red-500 text-xs font-bold px-3 py-1 rounded-full">
            Ver todas
          </div>
        </div>
      </section>

      {/* Destacados */}
      <section>
        <h2 className="text-lg font-bold mb-3">Destacados</h2>
        <div className="grid grid-cols-2 gap-4">
          {products.map(p => (
            <Link key={p.id} to={`/product/${p.id}`} className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col">
              <div className="relative aspect-square">
                <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                {p.isOffer && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                    OFERTA
                  </span>
                )}
              </div>
              <div className="p-3 flex flex-col flex-1">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">{p.name}</h3>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-bold text-green-600">${p.price.toLocaleString('es-CL')}</span>
                  <span className="text-xs text-gray-500">{p.unit}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
