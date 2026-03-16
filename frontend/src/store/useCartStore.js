import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      // Acciones
      addToCart: (product) => {
        const cart = get().cart;
        const existing = cart.find(item => item.id_producto === product.id_producto);

        if (existing) {
          set({
            cart: cart.map(item =>
              item.id_producto === product.id_producto
                ? { ...item, quantity: (item.quantity || 1) + 1 }
                : item
            )
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item.id_producto !== productId) });
      },

      updateQuantity: (productId, newQuantity) => {
        if (newQuantity < 1) return;
        set({
          cart: get().cart.map(item =>
            item.id_producto === productId ? { ...item, quantity: newQuantity } : item
          )
        });
      },

      getTotalItems: () => {
        const cart = get().cart;
        return cart.reduce((acc, item) => acc + (item.quantity || 0), 0);
      },
      getTotalAmount: () => {
        const cart = get().cart;
        return cart.reduce((acc, item) => acc + (item.precio * (item.quantity || 0)), 0);
      },
    }),
    { name: 'cart-storage' }
  )
);