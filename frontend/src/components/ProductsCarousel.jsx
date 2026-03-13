import { useRef } from 'react';

const products = [
  { id: 1, name: "Miel de Brezo", price: "12.50€", shop: "Colmenar del Sur", img: "/featuredProducts/miel.jpg" },
  { id: 2, name: "Aceite Virgen Extra", price: "18.00€", shop: "Almazara Real", img: "/featuredProducts/aceiteOliva.jpg" },
  { id: 3, name: "Camiseta Tendencia", price: "4.20€", shop: "Camiseta Básica Negra", img: "/featuredProducts/camiseta.jpg" },
  { id: 4, name: "Tarta de Queso Lotus", price: "5.00€", shop: "Tarta Lotus", img: "featuredProducts/tartaQueso.jpg" },
  { id: 5, name: "Tortilla de patatas", price: "15.00€", shop: "Cocina Local", img: "/featuredProducts/tortillaPatatas.jpg" },
];

export const ProductsCarousel = () => {
  const carouselRef = useRef(null);

  // Hemos mejorado la función para que deslice exactamente el ancho de 1 tarjeta
  const scroll = (direction) => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.clientWidth / 3; 
      const scrollAmount = direction === 'left' ? -itemWidth : itemWidth;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-24 bg-base-200/50 relative z-10">
      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* CABECERA Y BOTONES */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-4 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-2">Productos Estrella</h2>
            <p className="text-base-content/60 text-lg">Pasa el ratón para ver la magia.</p>
          </div>
          
          <div className="flex gap-2">
            <button onClick={() => scroll('left')} className="btn btn-circle bg-base-100 border-base-300 hover:bg-jungle_teal hover:text-white transition-colors shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={() => scroll('right')} className="btn btn-circle bg-base-100 border-base-300 hover:bg-jungle_teal hover:text-white transition-colors shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* CONTENEDOR DEL CARRUSEL */}
        <div 
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto py-12 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              // Aquí está la magia: w-[85%] en móvil, exactamente 1/3 en PC
              className="hover-3d snap-center shrink-0 w-[85%] md:w-[calc(33.333%-1rem)] group cursor-pointer"
            >
              
              {/* LA TARJETA VISUAL (Ahora ocupa todo el ancho de su contenedor padre) */}
              <div className="w-full bg-base-100 rounded-3xl shadow-xl border border-base-200 overflow-hidden relative">
                
                <div className="h-56 overflow-hidden relative">
                  {/* FOTO: Ya NO tiene la clase de scale al hacer hover */}
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                  
                  <div className="absolute top-4 left-4 bg-base-100/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-sea_green-500 shadow-sm">
                    {product.shop}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-base-content mb-6 line-clamp-1">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black text-base-content">{product.price}</span>
                    <button className="btn btn-circle btn-sm bg-jungle_teal border-none text-white hover:bg-yellow-500 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* LOS 8 DIVS MÁGICOS PARA EL 3D */}
              <div></div><div></div><div></div><div></div>
              <div></div><div></div><div></div><div></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};