import { motion } from 'framer-motion';

const words = [
  "Frutas de Temporada", "Pan de Masa Madre", "Artesanía Local", 
  "Quesos Premiados", "Vinos de la Tierra", "Miel Orgánica",
  "Carnes de Pasto", "Aceite Virgen Extra", "Repostería Casera"
];

export const InfiniteTicker = () => {
  return (
    // bg-jungle_teal para que destaque como separador
    <div className="w-full bg-sea_green-500 py-4 overflow-hidden whitespace-nowrap relative border-y border-white/10">
      
      {/* Contenedor de la animación */}
      <motion.div 
        className="flex"
        animate={{
          x: [0, -1000], // Se desplaza hacia la izquierda
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20, // Velocidad (más segundos = más lento)
            ease: "linear",
          },
        }}
      >
        {/* Renderizamos las palabras dos veces para que el bucle sea infinito y sin cortes */}
        {[...words, ...words].map((word, index) => (
          <div key={index} className="flex items-center">
            <span className="text-white text-xl md:text-2xl font-black uppercase tracking-widest px-8">
              {word}
            </span>
            {/* Un pequeño separador visual entre palabras */}
            <span className="text-yellow-500 text-2xl">✦</span>
          </div>
        ))}
      </motion.div>

      {/* Efecto de degradado en los bordes para que las palabras aparezcan/desaparezcan suavemente */}
      <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-jungle_teal to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-jungle_teal to-transparent z-10"></div>
    </div>
  );
};