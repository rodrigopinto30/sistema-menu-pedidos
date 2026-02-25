import { create } from 'zustand';
import { OrderItem } from '@/services/orderServices';

interface CartState {
  items: OrderItem[];
  addItem: (productId: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>((set: any, get:any) => ({
  items: [],

  addItem: (productId: number) => {
    const currentItems = get().items;
    const existingItem = currentItems.find((item: any) => item.product_id === productId);

    if (existingItem) {
      set({
        items: currentItems.map((item: any) =>
          item.product_id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ items: [...currentItems, { product_id: productId, quantity: 1 }] });
    }
  },

  removeItem: (productId: number) => {
    set({ items: get().items.filter((item: any) => item.product_id !== productId) });
  },

  clearCart: () => set({ items: [] }),

  getTotalItems: () => get().items.reduce((acc: any, item: any) => acc + item.quantity, 0),
}));