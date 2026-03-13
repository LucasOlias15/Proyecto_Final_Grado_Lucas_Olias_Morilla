import { motion } from 'framer-motion';
import { Link } from 'wouter';

export const Logo = () => {
  return (
    <Link href="/">
    <motion.div 
      className="flex items-center gap-2 cursor-pointer"
      whileHover="hover" 
    >
      {/* Icono con sus animaciones (Mantenemos el salto y el brillo) */}
      <motion.svg 
        viewBox="0 0 100 120" 
        className="w-10 h-12"
        variants={{
          hover: { y: -5, rotate: [-1, 1, -1, 1, 0], transition: { duration: 0.4 } }
        }}
      >
        <motion.path 
          className="fill-jungle_teal" 
          d="M50 0C22.4 0 0 22.4 0 50c0 35 50 70 50 70s50-35 50-70C100 22.4 77.6 0 50 0z" 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.path 
          d="M35 35v-5a15 15 0 0 1 30 0v5" 
          stroke="white" strokeWidth="6" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.path 
          d="M25 35h50l5 40H20z" 
          stroke="white" strokeWidth="6" fill="none" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.circle 
          cx="50" cy="55" r="14" 
          className="fill-yellow-500" 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.8 }}
          variants={{
            hover: { scale: 1.2, filter: "brightness(1.1)" }
          }}
        />
      </motion.svg>

      {/* Texto Animado Verticalmente */}
      <div className="font-bold text-2xl tracking-tight flex whitespace-nowrap">
        <motion.span 
          className="text-jungle_teal"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          variants={{
            hover: { y: 2, transition: { type: "spring", stiffness: 400, damping: 10 } } // Local baja
          }}
        >
          Local
        </motion.span>
        <motion.span 
          className="text-yellow-500 ml-1"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          variants={{
            hover: { y: -2, transition: { type: "spring", stiffness: 400, damping: 10 } } // Markt sube
          }}
        >
          Markt
        </motion.span>
      </div>
    </motion.div>
    </Link>
  );
};