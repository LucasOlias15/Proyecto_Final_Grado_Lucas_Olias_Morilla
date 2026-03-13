import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearch } from 'wouter';
import { IconTicker } from '../components/IconTicker';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = (emoji) => L.divIcon({
  html: `<div style="font-size: 24px; background: white; padding: 10px; border-radius: 15px; border: 2px solid #00a388; box-shadow: 0 10px 20px rgba(0,0,0,0.2); transform: rotate(3deg);">${emoji}</div>`,
  className: 'custom-pin',
  iconSize: [54, 54],
  iconAnchor: [22, 45]
});

const shops = [
  { id: 1, name: "Frutería Paco", type: "Frutería", coords: [37.9808, 12.9604], emoji: '🍎', distance: "0.2 km", rating: "4.8", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400" },
  { id: 2, name: "Panadería El Horno", type: "Panadería", coords: [37.9768, 12.9618], emoji: '🥖', distance: "0.5 km", rating: "4.9", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400" },
  { id: 3, name: "Carnes selectas Ruiz", type: "Carnicería", coords: [37.9828, 12.9607], emoji: '🥩', distance: "0.8 km", rating: "4.7", img: "https://images.unsplash.com/photo-1607623814075-e51df1bd682f?w=400" },
  { id: 4, name: "Quesos de la Tierra", type: "Bio", coords: [37.9799, 12.9580], emoji: '🧀', distance: "1.2 km", rating: "5.0", img: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400" },
];

// Este componente es el que mueve la cámara físicamente
const MapController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { animate: true, duration: 1.5 });
    }
  }, [center, zoom, map]);
  return null;
};

export const MapPage = () => {
  const [mapCenter, setMapCenter] = useState([40.4167, -3.7037]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [filter, setFilter] = useState('Todos'); // <-- Añadido que faltaba
  const [zoomLevel, setZoomLevel] = useState(15); // Estado para el zoom
  
  const searchParams = new URLSearchParams(useSearch());
  const searchQuery = searchParams.get('search')?.toLowerCase() || "";

  // Lógica de filtrado combinada (Busqueda + Categoría)
  const filteredShops = shops.filter(shop => {
    const matchesFilter = filter === 'Todos' || shop.type === filter;
    const matchesSearch = shop.name.toLowerCase().includes(searchQuery) || shop.type.toLowerCase().includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  // Función para Mi Ubicación (Geolocalización real)
  const handleGeoLocation = () => {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMapCenter([latitude, longitude]);
        setZoomLevel(17); // Zoom más cercano al encontrarte
      },
      (error) => {
        alert("No se pudo obtener tu ubicación. Revisa los permisos de tu navegador.");
      }
    );
  };

  // Funciones de Zoom
  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 1, 18));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 1, 5));

  // Efecto para volar a la tienda si viene del buscador
  useEffect(() => {
    if (searchQuery) {
      const foundShop = shops.find(s => 
        s.name.toLowerCase().includes(searchQuery) || s.type.toLowerCase().includes(searchQuery)
      );
      if (foundShop) setMapCenter(foundShop.coords);
    }
  }, [searchQuery]);

  return (
    <div className="w-full min-h-screen bg-base-100 pb-32">
      
      {/* 1. SECCIÓN DE CABECERA */}
      <section className="w-full max-w-7xl mx-auto px-8 md:px-16 pt-32 pb-16 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
        <div className="w-full lg:w-3/5 text-left z-10">
          <motion.h1 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-base-content leading-[1.05] tracking-tighter"
          >
            Comercios <br />
            cerca de ti <br />
            a un <span className="text-transparent bg-clip-text bg-gradient-to-r from-jungle_teal to-sea_green-500 pb-2 inline-block">click.</span>
          </motion.h1>
          <motion.p className="mt-6 text-xl text-base-content/60 font-medium max-w-md">
            Encuentra pan fresco, fruta de temporada y los mejores servicios a menos de 10 minutos de tu casa.
          </motion.p>
        </div>

        <div className="w-full lg:w-2/5 relative flex justify-center lg:justify-end">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-jungle_teal/20 rounded-full blur-[80px] -z-10 animate-pulse"></div>
          <motion.div className="bg-base-100/60 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-[2.5rem] p-8 max-w-sm w-full relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-full border-4 border-base-100 bg-jungle_teal text-white flex items-center justify-center font-bold">+120</div>
              <p className="font-bold">Tiendas activas en tu zona</p>
            </div>
            <div className="relative">
              <input type="text" placeholder="Ej: Panadería..." className="w-full bg-base-200/80 px-6 py-4 rounded-2xl focus:outline-none" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CINTA INCLINADA */}
      <section className="w-full relative py-20 overflow-hidden flex items-center justify-center">
        <div className="map-ribbon-main w-[110vw] h-20 shadow-2xl flex items-center -rotate-2 z-20 transition-colors bg-jungle_teal">
          <IconTicker />
        </div>
        <div className="map-ribbon-bg absolute w-[110vw] h-20 rotate-2 z-10 opacity-30 blur-[6px] bg-yellow-400"></div>
      </section>

      {/* 3. SECCIÓN DEL MAPA */}
      <section className="w-full max-w-7xl mx-auto px-6 mb-24">
        <div className="relative w-full h-[650px] md:h-[750px] bg-base-200 rounded-[3.5rem] shadow-2xl overflow-hidden border border-base-300 group">
          
          {/* FILTROS: z-50 para que el Header (z-2000) lo tape al bajar */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
            <div className="bg-base-100/80 backdrop-blur-xl p-2 rounded-2xl border border-white/20 shadow-xl flex gap-2 overflow-x-auto no-scrollbar">
              {['Todos', 'Frutería', 'Panadería', 'Carnicería', 'Bio'].map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${filter === cat ? 'bg-jungle_teal text-white' : 'bg-base-200 text-base-content/70'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* MAPA REAL: Único y controlado */}
          <MapContainer 
            center={mapCenter} 
            zoom={15} 
            zoomControl={false} 
            className="h-full w-full z-10"
          >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
            
            <MapController center={mapCenter} />

            {filteredShops.map((shop) => (
              <Marker 
                key={shop.id} 
                position={shop.coords} 
                icon={customIcon(shop.emoji)}
                eventHandlers={{ click: () => {
                  setSelectedShop(shop);
                  setMapCenter(shop.coords);
                }}}
              />
            ))}
          </MapContainer>

{/* BOTONES DE CONTROL (Zoom y Ubicación) */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
            {/* Botón Mi Ubicación (El nuevo 🎯) */}
            <button 
              onClick={handleGeoLocation}
              className="w-12 h-12 bg-jungle_teal text-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-110 transition-all mb-4"
              title="Mi ubicación"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            {/* Botones Zoom */}
            <button 
              onClick={zoomIn}
              className="w-12 h-12 bg-base-100/90 backdrop-blur-md rounded-2xl shadow-lg flex items-center justify-center hover:bg-jungle_teal hover:text-white transition-all font-bold text-xl"
            > + </button>
            <button 
              onClick={zoomOut}
              className="w-12 h-12 bg-base-100/90 backdrop-blur-md rounded-2xl shadow-lg flex items-center justify-center hover:bg-jungle_teal hover:text-white transition-all font-bold text-xl"
            > - </button>
          </div>

          {/* TARJETA DETALLE */}
          <AnimatePresence>
            {selectedShop && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
                className="absolute bottom-6 right-6 left-6 md:left-auto md:w-[380px] bg-base-100/90 backdrop-blur-2xl p-6 rounded-[2.5rem] shadow-2xl z-[10]"
              >
                <div className="flex gap-4">
                  <img src={selectedShop.img} className="w-24 h-24 rounded-2xl object-cover" />
                  <div className="flex-1">
                    <h3 className="text-xl font-black">{selectedShop.name}</h3>
                    <p className="text-xs text-jungle_teal font-bold uppercase tracking-widest">{selectedShop.type}</p>
                    <Link href={`/tienda/${selectedShop.id}`} className="btn btn-sm mt-4 w-full bg-jungle_teal hover:bg-sea_green text-white border-none rounded-xl font-black">Entrar ➔</Link>
                  </div>
                </div>
                <button onClick={() => setSelectedShop(null)} className="absolute top-4 right-4 text-base-content/30 hover:text-base-content">✕</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};