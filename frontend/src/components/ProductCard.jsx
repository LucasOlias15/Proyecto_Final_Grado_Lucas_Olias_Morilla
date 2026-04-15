import { motion } from "framer-motion";
import { useCartStore } from "../store/useCartStore"; // Importamos el hook de Zustand para acceder al carrito
import { HeartPlus } from "lucide-react";
import { useState } from "react";

export const ProductCard = ({ product, isFavorito }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const [prodFavorito, setProdFavorito] = useState(isFavorito);

  const handleAdd = () => {
    const userString = localStorage.getItem("user");
    const userId = userString ? JSON.parse(userString).id : null;

    const productForCart = {
      id_producto: product.id || product.id_producto,
      nombre: product.name || product.nombre,
      precio: product.price || product.precio,
      imagen: product.img || product.imagen,
      id_comercio: product.id_comercio, // Aquí recogemos el ID de la tienda
    };

    addToCart(userId, productForCart);
    // Emitimos un evento personalizado para abrir el carrito
    window.dispatchEvent(new CustomEvent("openCart"));
  };

  const handleFavorito = () => {
    setProdFavorito(!prodFavorito);
  };

  return (
    <div className="group bg-white dark:bg-base-200 rounded-[2.5rem] p-5 border-2 border-base-200 dark:border-white/10 shadow-md hover:shadow-2xl transition-all duration-500">
      {/* Contenedor de Imagen */}
      <div className="relative h-60 w-full rounded-4xl overflow-hidden bg-base-100 dark:bg-base-300">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute top-4 right-4 bg-yellow-400 text-jungle_teal-100 px-5 py-2 rounded-2xl font-black shadow-xl border border-white/20">
          {product.price}€
          <span className="text-[10px] opacity-70 ml-1">
            /{product.unit || "ud"}
          </span>
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
          <button
            onClick={handleAdd}
            className="cursor-pointer flex-3 bg-jungle_teal hover:bg-sea_green text-white font-black py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-jungle_teal/20 active:scale-95"
          >
            Añadir al carrito
          </button>

          <button
            onClick={handleFavorito}
            className={`flex-1 h-14 flex items-center justify-center rounded-2xl transition-all duration-300 cursor-pointer ${
              prodFavorito
                ? "bg-red-100 dark:bg-red-900/30 text-red-500" // Estilo cuando ESTÁ en favoritos ❤️
                : "bg-base-200 dark:bg-base-300 text-base-content/40 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20" // Estilo normal 🤍
            }`}
          >
            <HeartPlus
              size={24}
              fill={prodFavorito ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
