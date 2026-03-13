import { motion } from 'framer-motion';
import { useRoute } from 'wouter';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductCard } from '../components/ProductCard';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export const ShopDetail = () => {
  const [, params] = useRoute("/tienda/:id");
  
  const gallery = [
    "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200",
    "https://images.unsplash.com/photo-1601599561213-832382fd07ba?q=80&w=1200",
    "https://images.unsplash.com/photo-1574944985070-8f3ebf6b79d2?q=80&w=1200"
  ];

  const shop = {
    name: "Frutería Paco",
    description: "Frutas y verduras frescas del día, traídas directamente de la huerta a tu mesa. Especialistas en productos de temporada y trato cercano.",
    address: "Calle del Olmo, 14",
    rating: 4.8,
    categories: ["Frutas", "Verduras", "Legumbres", "Ecológico"]
  };

  const products = [
    { id: 1, name: "Manzana Fuji Selección", price: "2.45", unit: "kg", description: "Manzanas dulces y crujientes de la cuenca del Segura.", img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=400" },
    { id: 2, name: "Tomate Rosa de Barbastro", price: "4.20", unit: "kg", description: "Sabor auténtico a tomate de verdad. Piel fina.", img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=400" },
    { id: 3, name: "Cesta Variada Eco", price: "15.00", unit: "ud", description: "5kg de productos de temporada seleccionados.", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400" },
    { id: 4, name: "Aceite de Oliva Virgen Extra", price: "9.50", unit: "l", description: "Aceite de primera prensada en frío.", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=400" }
  ];

  return (
    <div className="w-full min-h-screen bg-base-100 pb-20">
      
      {/* 1. CAROUSEL SUPERIOR */}
      <section className="h-[70vh] w-full relative group overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect={'fade'}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="h-full w-full"
        >
          {gallery.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img src={img} className="w-full h-full object-cover" alt="Imagen tienda" />
                <div className="absolute inset-0 bg-linear-to-t from-base-100 via-transparent to-black/20" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 2. CABECERA DE INFO (Grid 80/20 solo para la parte de arriba) */}
      <section className="max-w-7xl mx-auto px-6 mt-12 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 items-start">
          
          {/* INFORMACIÓN PRINCIPAL (80%) */}
          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-5xl md:text-7xl font-black text-base-content mb-6 tracking-tighter">
                {shop.name}
              </h1>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="badge badge-lg bg-jungle_teal dark:bg-jungle_teal-400 text-white border-none py-4 px-6 font-bold shadow-lg shadow-jungle_teal/20">
                  📍 {shop.address}
                </span>
                <span className="badge badge-lg bg-yellow-400 text-jungle_teal-200 border-none py-4 px-6 font-bold">
                  ⭐ {shop.rating} Calificación
                </span>
              </div>

              <p className="text-xl md:text-2xl text-base-content/70 leading-relaxed mb-8 italic max-w-4xl">
                "{shop.description}"
              </p>

              <div className="flex flex-wrap gap-2">
                {shop.categories.map(cat => (
                  <span key={cat} className="px-5 py-2 bg-base-200 dark:bg-base-300 rounded-xl text-xs font-black uppercase tracking-widest text-base-content/50 border border-base-300">
                    {cat}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* HORARIO (20%) */}
          <aside className="lg:col-span-2">
            <div className="bg-base-200/50 dark:bg-base-200/20 backdrop-blur-md p-6 rounded-[2.5rem] border border-base-300 shadow-xl">
              <h3 className="font-black text-lg mb-4 text-jungle_teal dark:text-jungle_teal-600 uppercase tracking-tighter">Horarios</h3>
              <ul className="space-y-3 text-xs font-bold">
                <li className="flex justify-between border-b border-base-300 pb-1">
                  <span className="opacity-40">L-V</span>
                  <span>09:00 - 20:30</span>
                </li>
                <li className="flex justify-between border-b border-base-300 pb-1">
                  <span className="opacity-40">Sáb</span>
                  <span>10:00 - 14:30</span>
                </li>
                <li className="flex justify-between text-error italic">
                  <span>Dom</span>
                  <span>Cerrado</span>
                </li>
              </ul>
              <button className="w-full mt-6 py-3 bg-jungle_teal text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-sea_green transition-colors">
                Contactar
              </button>
            </div>
          </aside>
        </div>
      </section>

      {/* 3. SECCIÓN DE PRODUCTOS (Fuera del grid de 80/20 para ocupar más ancho) */}
      <section className="max-w-7xl mx-auto px-6 pt-12 border-t border-base-200">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-black text-base-content tracking-tighter">
            Catálogo de <span className="text-jungle_teal">productos</span>
          </h2>
          <div className="text-sm font-bold opacity-40 uppercase tracking-widest">
            {products.length} artículos
          </div>
        </div>

        {/* Grid de productos a 3 columnas reales y espaciosos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};