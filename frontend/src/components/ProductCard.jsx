import { motion } from 'framer-motion';

const handleAdd = () => {
  // 1. Lanzamos un evento personalizado
  const event = new CustomEvent('openCart');
  window.dispatchEvent(event);
  
  // 2. Aquí podrías añadir la lógica para sumar el producto al array del carrito
  console.log("Producto añadido:", product.name);
};

export const ProductCard = ({ product }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      // BG-WHITE para que destaque sobre el fondo grisáceo de la web
      // Borde más marcado (border-base-300) para que se note el límite de la tarjeta
      className="group bg-white dark:bg-base-200 rounded-[2.5rem] p-5 border-2 border-base-200 dark:border-white/10 shadow-md hover:shadow-2xl transition-all duration-500"
    >
      {/* Contenedor de Imagen */}
      <div className="relative h-60 w-full rounded-[2rem] overflow-hidden bg-base-100 dark:bg-base-300">
        <img 
          src={product.img} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Etiqueta de precio: Verde oscuro sobre amarillo (ESTO SÍ SE VE) */}
        <div className="absolute top-4 right-4 bg-yellow-400 text-jungle_teal-100 px-5 py-2 rounded-2xl font-black shadow-xl border border-white/20">
          {product.price}€<span className="text-[10px] opacity-70 ml-1">/{product.unit}</span>
        </div>
      </div>

      {/* Info del Producto */}
      <div className="mt-8 px-2 pb-2">
        <h3 className="text-2xl font-black text-base-content leading-tight mb-3 tracking-tighter">
          {product.name}
        </h3>
        
        <p className="text-sm text-base-content/60 line-clamp-2 mb-8 font-medium">
          {product.description}
        </p>

        {/* Botones Rediseñados para Contraste Máximo */}
        <div className="flex items-center gap-3">
          {/* Botón principal: SIEMPRE VERDE OSCURO (Contraste alto sobre blanco y sobre gris oscuro) */}
<button 
  onClick={handleAdd}
  className="flex-[3] bg-jungle_teal hover:bg-sea_green text-white font-black py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-jungle_teal/20 active:scale-95"
>            Añadir al carrito
          </button>
          
          {/* Botón secundario: Fondo suave para que no compita */}
          <button className="flex-1 h-14 flex items-center justify-center bg-base-200 dark:bg-base-300 hover:bg-yellow-400 text-base-content hover:text-jungle_teal-100 rounded-2xl transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};