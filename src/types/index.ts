export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  minStock: number;
  unit: string;
  category: string;
  imageUrl: string;
  isOffer?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  substitutionPreference: 'similar' | 'none' | 'specific';
  substitutionNote?: string;
}

export type OrderStatus = 'recibido' | 'preparando' | 'en_camino' | 'entregado';

export interface Order {
  id: string;
  items: CartItem[];
  status: OrderStatus;
  total: number;
  subtotal: number;
  shippingCost: number;
  deliveryAddress: string;
  deliveryWindow: string;
  customerName: string;
  customerPhone: string;
  paymentMethod: string;
  createdAt: string;
  replacementsPending?: number;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: 'client' | 'admin';
  addresses: string[];
}
