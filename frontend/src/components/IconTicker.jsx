import { motion } from 'framer-motion';

// Array base con nuestros 4 iconos
const baseIcons = [
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tag"><path d="M12.586 2.586a2 2 0 0 0-2.828 0L2.586 9.758a2 2 0 0 0 0 2.828l7.172 7.172a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-7.172-7.172Z"/><path d="M15 9h.01"/></svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
];

const iconSet = [...baseIcons, ...baseIcons, ...baseIcons];

export const IconTicker = () => {
  return (
    <div className="w-full flex items-center overflow-hidden whitespace-nowrap">
      <motion.div
        animate={{ x: [0, "-50%"] }}
        transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
        className="flex shrink-0 w-max items-center h-full"
      >
        {[...iconSet, ...iconSet].map((icon, index) => (
          <div 
            key={index} 
            // Solo dejamos map-ribbon-icon, los tamaños y el transition. 
            // CERO clases de colores de Tailwind aquí.
            className="map-ribbon-icon w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mx-8 md:mx-16 shrink-0 transition-colors duration-300"
          >
            {icon}
          </div>
        ))}
      </motion.div>
    </div>
  );
};