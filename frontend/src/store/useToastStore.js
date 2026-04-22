// src/stores/useToastStore.js
import { create } from 'zustand';

const useToastStore = create((set, get) => ({
  // Estado
  toasts: [],
  
  // Acciones
  addToast: (mensaje, tipo = 'success', duracion = 3000) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 5);
    
    set((state) => ({
      toasts: [...state.toasts, { id, mensaje, tipo, duracion }]
    }));
    
    // Auto-eliminar después de la duración
    setTimeout(() => {
      get().removeToast(id);
    }, duracion);
  },
  
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter(toast => toast.id !== id)
    }));
  },
  
  // Helpers semánticos
  success: (mensaje, duracion) => get().addToast(mensaje, 'success', duracion),
  error: (mensaje, duracion) => get().addToast(mensaje, 'error', duracion),
  warning: (mensaje, duracion) => get().addToast(mensaje, 'warning', duracion),
  info: (mensaje, duracion) => get().addToast(mensaje, 'info', duracion),
}));

export default useToastStore;