import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import useToastStore from '../../store/useToastStore';

const toastConfig = {
  success: {
    icon: CheckCircle2,
    containerClass: 'alert-success text-white',
    iconClass: 'text-white'
  },
  error: {
    icon: XCircle,
    containerClass: 'alert-error text-white',
    iconClass: 'text-white'
  },
  warning: {
    icon: AlertTriangle,
    containerClass: 'alert-warning text-white',
    iconClass: 'text-white'
  },
  info: {
    icon: Info,
    containerClass: 'alert-info text-white',
    iconClass: 'text-white'
  }
};

const ToastItem = ({ toast, onClose }) => {
  const config = toastConfig[toast.tipo] || toastConfig.info;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`alert ${config.containerClass} shadow-xl rounded-2xl flex items-center gap-3 pr-12 min-w-80 max-w-md relative`}
      role="alert"
    >
      <Icon className="w-6 h-6 shrink-0" />
      <span className="font-medium text-sm flex-1">{toast.mensaje}</span>
      <button 
        onClick={onClose}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Cerrar"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  // Renderizar en un portal para evitar problemas de z-index
  if (typeof document === 'undefined') return null;
  
  return createPortal(
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-9999 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem 
              toast={toast} 
              onClose={() => removeToast(toast.id)} 
            />
          </div>
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
};