import { create } from 'zustand';
import { Product, CartItem, Order, User } from '../types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    sku: 'ARZ-001',
    name: 'Arroz 1kg Tradicional',
    description: 'Arroz grado 1, grano largo.',
    price: 1290,
    stock: 12,
    minStock: 6,
    unit: '1 kg',
    category: 'Despensa',
    imageUrl: 'https://picsum.photos/seed/arroz/400/400',
  },
  {
    id: '2',
    sku: 'ARZ-002',
    name: 'Arroz integral 1kg',
    description: 'Arroz integral rico en fibra.',
    price: 1590,
    stock: 2,
    minStock: 5,
    unit: '1 kg',
    category: 'Despensa',
    imageUrl: 'https://picsum.photos/seed/arrozint/400/400',
  },
  {
    id: '3',
    sku: 'LEC-001',
    name: 'Leche Entera 1L',
    description: 'Leche natural entera.',
    price: 1100,
    stock: 3,
    minStock: 8,
    unit: '1 L',
    category: 'Lácteos',
    imageUrl: 'https://picsum.photos/seed/leche/400/400',
    isOffer: true,
  },
  {
    id: '4',
    sku: 'PAN-001',
    name: 'Pan Hallulla 1kg',
    description: 'Pan fresco del día.',
    price: 1500,
    stock: 0,
    minStock: 10,
    unit: '1 kg',
    category: 'Panadería',
    imageUrl: 'https://picsum.photos/seed/pan/400/400',
  },
  {
    id: '5',
    sku: 'HUE-001',
    name: 'Huevos Blancos 12 un',
    description: 'Huevos blancos tamaño grande.',
    price: 2490,
    stock: 20,
    minStock: 10,
    unit: '12 un',
    category: 'Lácteos',
    imageUrl: 'https://picsum.photos/seed/huevos/400/400',
  }
];

interface AppState {
  user: User | null;
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  
  // Actions
  setUser: (user: User | null) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateProductStock: (productId: string, newStock: number) => void;
}

export const useStore = create<AppState>((set) => ({
  user: {
    id: 'u1',
    name: 'Mirko',
    phone: '+56912345678',
    email: 'mirko@example.com',
    role: 'client',
    addresses: ['Casa - Av. Siempre Viva 742'],
  },
  products: MOCK_PRODUCTS,
  cart: [],
  orders: [
    {
      id: '1042',
      items: [
        {
          product: MOCK_PRODUCTS[1],
          quantity: 1,
          substitutionPreference: 'similar'
        }
      ],
      status: 'preparando',
      subtotal: 1590,
      shippingCost: 990,
      total: 2580,
      deliveryAddress: 'Casa - Av. Siempre Viva 742',
      deliveryWindow: 'Hoy 18:00-19:00',
      customerName: 'Mirko',
      customerPhone: '+56912345678',
      paymentMethod: 'Tarjeta',
      createdAt: new Date().toISOString(),
      replacementsPending: 1,
    }
  ],

  setUser: (user) => set({ user }),
  
  addToCart: (item) => set((state) => {
    const existing = state.cart.find(i => i.product.id === item.product.id);
    if (existing) {
      return {
        cart: state.cart.map(i => 
          i.product.id === item.product.id 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      };
    }
    return { cart: [...state.cart, item] };
  }),

  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(i => i.product.id !== productId)
  })),

  updateCartQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map(i => 
      i.product.id === productId ? { ...i, quantity } : i
    )
  })),

  clearCart: () => set({ cart: [] }),

  placeOrder: (orderData) => set((state) => {
    const newOrder: Order = {
      ...orderData,
      id: Math.floor(1000 + Math.random() * 9000).toString(),
      status: 'recibido',
      createdAt: new Date().toISOString(),
    };
    return { 
      orders: [newOrder, ...state.orders],
      cart: [] // clear cart on place order
    };
  }),

  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map(o => 
      o.id === orderId ? { ...o, status } : o
    )
  })),

  updateProductStock: (productId, newStock) => set((state) => ({
    products: state.products.map(p => 
      p.id === productId ? { ...p, stock: newStock } : p
    )
  })),
}));
