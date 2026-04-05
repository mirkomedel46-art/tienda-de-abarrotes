import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Minus, Plus, AlertCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useStore(state => state.products.find(p => p.id === id));
  const addToCart = useStore(state => state.addToCart);

  const [quantity, setQuantity] = useState(1);
  const [substitution, setSubstitution] = useState<'similar' | 'none'>('similar');
  const [note, setNote] = useState('');

  if (!product) return <div className="p-4">Producto no encontrado</div>;

  const handleAddToCart = () => {
    addToCart({
      product,
      quantity,
      substitutionPreference: substitution,
      substitutionNote: note
    });
    navigate('/cart');
  };

  return (
    <div className="bg-white min-h-screen -mx-4 -mt-4">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 p-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="font-medium truncate flex-1">{product.name}</h1>
      </div>

      {/* Image */}
      <div className="aspect-square w-full bg-gray-100">
        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
      </div>

      <div className="p-4 space-y-6">
        {/* Info */}
        <div>
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
            <span className="text-2xl font-bold text-green-600">${product.price.toLocaleString('es-CL')}</span>
          </div>
          <p className="text-gray-500 text-sm mb-2">{product.description}</p>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded">Unidad: {product.unit}</span>
            {product.stock <= product.minStock && product.stock > 0 && (
              <span className="text-orange-600 bg-orange-50 px-2 py-1 rounded flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> Stock: Bajo
              </span>
            )}
          </div>
        </div>

        {/* Substitution Preferences */}
        <div className="bg-gray-50 p-4 rounded-xl space-y-3 border border-gray-200">
          <h3 className="font-medium text-gray-900">Preferencia de sustitución</h3>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input 
                type="radio" 
                name="subst" 
                checked={substitution === 'similar'} 
                onChange={() => setSubstitution('similar')}
                className="text-green-600 focus:ring-green-500"
              />
              Reemplazar por similar
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input 
                type="radio" 
                name="subst" 
                checked={substitution === 'none'} 
                onChange={() => setSubstitution('none')}
                className="text-green-600 focus:ring-green-500"
              />
              No reemplazar
            </label>
          </div>
          <input 
            type="text" 
            placeholder='Nota: ej. "si no hay, marca X"' 
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full text-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        {/* Quantity & Add */}
        <div className="flex items-center gap-4 pt-4">
          <div className="flex items-center border border-gray-300 rounded-lg h-12">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 h-full text-gray-600 hover:bg-gray-50 rounded-l-lg"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 h-full text-gray-600 hover:bg-gray-50 rounded-r-lg"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 bg-green-600 text-white h-12 rounded-lg font-bold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {product.stock === 0 ? 'Agotado' : 'AGREGAR AL CARRITO'}
          </button>
        </div>
      </div>
    </div>
  );
}
