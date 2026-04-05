import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Minus, Plus, Trash2, Tag, ShoppingCart } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function Cart() {
  const navigate = useNavigate();
  const cart = useStore(state => state.cart);
  const updateQuantity = useStore(state => state.updateCartQuantity);
  const removeFromCart = useStore(state => state.removeFromCart);

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 990 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
          <ShoppingCart className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-xl font-medium text-gray-900">Tu carrito está vacío</h2>
        <Link to="/" className="text-green-600 font-medium hover:underline">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Carrito</h1>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.product.id} className="bg-white p-4 rounded-xl border border-gray-200 flex gap-4">
            <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg" />
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-gray-900 line-clamp-2 pr-4">{item.product.name}</h3>
                <button onClick={() => removeFromCart(item.product.id)} className="text-gray-400 hover:text-red-500">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Sustitución: {item.substitutionPreference === 'similar' ? 'Similar' : 'No reemplazar'}
              </p>
              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="font-bold text-green-600">${item.product.price.toLocaleString('es-CL')}</span>
                <div className="flex items-center border border-gray-300 rounded-lg h-8">
                  <button 
                    onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                    className="px-2 h-full text-gray-600 hover:bg-gray-50 rounded-l-lg"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="px-2 h-full text-gray-600 hover:bg-gray-50 rounded-r-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coupon */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cupón de descuento" 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          />
        </div>
        <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium">
          Aplicar
        </button>
      </div>

      {/* Summary */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-3">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toLocaleString('es-CL')}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Despacho (estimado)</span>
          <span>${shipping.toLocaleString('es-CL')}</span>
        </div>
        <div className="pt-3 border-t border-gray-100 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total.toLocaleString('es-CL')}</span>
        </div>
      </div>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-16 md:bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-40">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={() => navigate('/checkout')}
            className="w-full bg-green-600 text-white h-12 rounded-lg font-bold hover:bg-green-700 flex items-center justify-center gap-2"
          >
            IR A PAGAR <span className="font-normal text-green-200">|</span> ${total.toLocaleString('es-CL')}
          </button>
        </div>
      </div>
    </div>
  );
}

