import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Clock, CreditCard, User as UserIcon } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function Checkout() {
  const navigate = useNavigate();
  const cart = useStore(state => state.cart);
  const user = useStore(state => state.user);
  const placeOrder = useStore(state => state.placeOrder);

  const [paymentMethod, setPaymentMethod] = useState('Tarjeta');
  const [deliveryWindow, setDeliveryWindow] = useState('Hoy 18:00-19:00');

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping = 990;
  const total = subtotal + shipping;

  const handleConfirm = () => {
    placeOrder({
      items: cart,
      subtotal,
      shippingCost: shipping,
      total,
      deliveryAddress: user?.addresses[0] || 'Dirección no definida',
      deliveryWindow,
      customerName: user?.name || 'Cliente',
      customerPhone: user?.phone || '',
      paymentMethod,
    });
    // In a real app, we would get the new order ID. Here we just redirect to the first order.
    // For simplicity, we'll just redirect to the orders list or a specific mock ID.
    setTimeout(() => {
      navigate('/order/latest'); // We'll handle 'latest' in the OrderTracking component
    }, 500);
  };

  if (cart.length === 0) return null;

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Checkout</h1>
      </div>

      <div className="space-y-4">
        {/* Address */}
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-400" /> Dirección
            </h2>
            <button className="text-sm text-green-600 font-medium">Editar</button>
          </div>
          <p className="text-gray-700 text-sm pl-7">{user?.addresses[0]}</p>
        </div>

        {/* Delivery Window */}
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" /> Ventana de entrega
            </h2>
            <button className="text-sm text-green-600 font-medium">Cambiar</button>
          </div>
          <select 
            value={deliveryWindow}
            onChange={(e) => setDeliveryWindow(e.target.value)}
            className="w-full pl-7 py-2 text-sm border-none bg-transparent focus:ring-0 text-gray-700"
          >
            <option>Hoy 18:00-19:00</option>
            <option>Hoy 19:00-20:00</option>
            <option>Mañana 10:00-11:00</option>
          </select>
        </div>

        {/* Contact */}
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-gray-400" /> Receptor
            </h2>
            <button className="text-sm text-green-600 font-medium">Editar</button>
          </div>
          <p className="text-gray-700 text-sm pl-7">{user?.name} / {user?.phone}</p>
        </div>

        {/* Payment */}
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <h2 className="font-medium flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-gray-400" /> Método de pago
          </h2>
          <div className="space-y-3 pl-7">
            <label className="flex items-center gap-3">
              <input type="radio" name="payment" checked={paymentMethod === 'Tarjeta'} onChange={() => setPaymentMethod('Tarjeta')} className="text-green-600 focus:ring-green-500" />
              <span className="text-sm">Tarjeta (Webpay)</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="radio" name="payment" checked={paymentMethod === 'Transferencia'} onChange={() => setPaymentMethod('Transferencia')} className="text-green-600 focus:ring-green-500" />
              <span className="text-sm">Transferencia</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="radio" name="payment" checked={paymentMethod === 'Efectivo'} onChange={() => setPaymentMethod('Efectivo')} className="text-green-600 focus:ring-green-500" />
              <span className="text-sm">Efectivo al recibir</span>
            </label>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-2">
          <h2 className="font-medium mb-2">Resumen</h2>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal ({cart.length} prod.)</span>
            <span>${subtotal.toLocaleString('es-CL')}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Despacho</span>
            <span>${shipping.toLocaleString('es-CL')}</span>
          </div>
          <div className="pt-2 border-t border-gray-100 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toLocaleString('es-CL')}</span>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-16 md:bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-40">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={handleConfirm}
            className="w-full bg-green-600 text-white h-12 rounded-lg font-bold hover:bg-green-700"
          >
            CONFIRMAR PEDIDO
          </button>
        </div>
      </div>
    </div>
  );
}
