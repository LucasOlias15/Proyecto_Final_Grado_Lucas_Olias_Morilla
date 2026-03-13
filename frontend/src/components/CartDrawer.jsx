import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react'; // <-- Esto es lo que faltaba

export const CartDrawer = ({ isOpen, onClose }) => {
  // 1. Creamos un estado para la cantidad
  const [quantity, setQuantity] = useState(2);
  const pricePerUnit = 2.45;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 1. OVERLAY */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] cursor-pointer"
          />

          {/* 2. PANEL LATERAL */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-base-100 shadow-[-20px_0_50px_rgba(0,0,0,0.2)] z-[201] flex flex-col border-l border-base-200"
          >
            {/* Cabecera del Carrito */}
            <div className="p-8 flex justify-between items-center border-b border-base-200">
              <div>
                <h2 className="text-3xl font-black tracking-tighter text-base-content">Tu Cesta</h2>
                <p className="text-xs font-bold text-jungle_teal uppercase tracking-widest mt-1">
                    {quantity} Productos de Paco
                </p>
              </div>
              <button 
                onClick={onClose} 
                className="btn btn-circle btn-ghost text-base-content hover:bg-error/10 hover:text-error transition-all"
              >
                ✕
              </button>
            </div>

            {/* Lista de Productos (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="group bg-base-200/50 p-4 rounded-[2rem] border border-transparent hover:border-jungle_teal/30 transition-all flex gap-4 items-center">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md">
                  <img src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=200" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-base-content leading-tight">Manzana Fuji</h4>
                  {/* Precio Dinámico */}
                  <p className="text-sm font-black text-jungle_teal mt-1">
                    {(pricePerUnit * quantity).toFixed(2)}€
                  </p>
                  
                  <div className="flex items-center gap-3 mt-3">
                    {/* Botón Menos */}
                    <button 
                        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                        className="w-8 h-8 rounded-xl bg-base-300 hover:bg-jungle_teal hover:text-white transition-colors flex items-center justify-center font-bold"
                    >
                        -
                    </button>
                    <span className="font-bold text-sm w-4 text-center">{quantity}</span>
                    {/* Botón Mas */}
                    <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 rounded-xl bg-base-300 hover:bg-jungle_teal hover:text-white transition-colors flex items-center justify-center font-bold"
                    >
                        +
                    </button>
                  </div>
                </div>
                <button className="text-base-content/20 hover:text-error transition-colors p-2">
                  🗑️
                </button>
              </div>
            </div>

            {/* Footer del Carrito (Resumen y Pago) */}
            <div className="p-8 bg-base-100 border-t border-base-200 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between items-end mb-6 px-2">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40 mb-1">Subtotal</p>
                  {/* Total Dinámico */}
                  <p className="text-3xl font-black text-base-content">
                    {(pricePerUnit * quantity).toFixed(2)}€
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-jungle_teal mb-1">Envío</p>
                  <p className="font-bold text-base-content">¡Gratis!</p>
                </div>
              </div>

              <button className="w-full bg-jungle_teal hover:bg-sea_green text-white font-black py-5 rounded-[2rem] text-lg shadow-xl shadow-jungle_teal/20 transition-all active:scale-95 flex items-center justify-center gap-3">
                Finalizar pedido
                <span className="text-xl">➔</span>
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 opacity-40">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span className="text-[10px] font-bold uppercase tracking-widest">Pago 100% Seguro</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};