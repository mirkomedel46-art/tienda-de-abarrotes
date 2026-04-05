import { useParams, Link } from 'react-router-dom';
import { Package, Clock, Truck, CheckCircle2, MessageCircle, FileText, AlertCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function OrderTracking() {
  const { id } = useParams();
  const orders = useStore(state => state.orders);
  
  // If id is 'latest', get the first order, else find by id
  const order = id === 'latest' ? orders[0] : orders.find(o => o.id === id);

  if (!order) {
    return <div className="p-4 text-center">Pedido no encontrado</div>;
  }

  const steps = [
    { id: 'recibido', label: 'Recibido', icon: FileText },
    { id: 'preparando', label: 'Preparando', icon: Package },
    { id: 'en_camino', label: 'En camino', icon: Truck },
    { id: 'entregado', label: 'Entregado', icon: CheckCircle2 },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === order.status);

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
        <h1 className="text-xl font-bold mb-1">Pedido #{order.id}</h1>
        <p className="text-sm text-gray-500">
          {new Date(order.createdAt).toLocaleDateString('es-CL', { weekday: 'long', hour: '2-digit', minute: '2-digit' })}
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full font-medium">
          {steps[currentStepIndex].icon({ className: "w-5 h-5" })}
          <span className="uppercase">{steps[currentStepIndex].label}</span>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="relative flex justify-between">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 rounded-full"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          ></div>
          
          {steps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            return (
              <div key={step.id} className="relative flex flex-col items-center gap-2 z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                  isCompleted ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300 text-gray-300'
                }`}>
                  <step.icon className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-medium absolute -bottom-6 whitespace-nowrap ${
                  isCurrent ? 'text-green-600' : isCompleted ? 'text-gray-800' : 'text-gray-400'
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="h-6"></div> {/* Spacer for labels */}
      </div>

      {/* Alerts / Replacements */}
      {order.replacementsPending && order.replacementsPending > 0 && order.status === 'preparando' && (
        <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-orange-800">Reemplazos pendientes ({order.replacementsPending})</h3>
              <p className="text-xs text-orange-700 mt-1">Algunos productos no están disponibles. Revisa las opciones.</p>
              <button className="mt-3 text-xs font-bold bg-orange-500 text-white px-3 py-1.5 rounded-lg">
                Ver opciones
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-4">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Llegada estimada</p>
            <p className="text-sm text-gray-600">{order.deliveryWindow}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Dirección de entrega</p>
            <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 p-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
          <MessageCircle className="w-4 h-4" /> Contactar tienda
        </button>
        <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 p-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
          <FileText className="w-4 h-4" /> Ver detalle
        </button>
      </div>
    </div>
  );
}
