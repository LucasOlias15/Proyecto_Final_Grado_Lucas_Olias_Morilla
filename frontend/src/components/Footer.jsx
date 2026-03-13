import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t-4 border-yellow-500 text-zinc-200 mt-20">
      
      {/* 1. EL GRADIENTE ANIMADO */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(-45deg, #002d20, #005c4b, #064e3b, #0f766e)",
          backgroundSize: "400% 400%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 15,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      {/* 2. LA CAPA OPACA PARA CONTRASTE */}
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none backdrop-blur-sm"></div>

      {/* 3. EL CONTENIDO DEL FOOTER */}
      <div className="relative z-10 flex flex-col">
        
        {/* Zona Superior: Enlaces (Usamos clases de daisyUI + flex/grid de Tailwind) */}
        <div className="footer p-10 flex flex-col md:flex-row justify-between gap-10">
          
          <aside className="max-w-xs">
            <div className="flex items-center gap-2 font-bold text-3xl mb-4 drop-shadow-lg">
              <span className="text-white">Local</span>
              <span className="text-yellow-500">Markt</span>
            </div>
            <p className="opacity-90 font-medium leading-relaxed">
              Conectando el comercio de cercanía con la era digital. 
              <br/>Tu mercado de confianza, ahora en un clic.
            </p>
          </aside> 

          <div className="flex gap-16 flex-wrap">
            <nav className="flex flex-col gap-2">
              <h6 className="footer-title text-yellow-500 opacity-100 mb-2">Explorar</h6> 
              <a className="link link-hover hover:text-yellow-500 transition-colors">Vender productos</a>
              <a className="link link-hover hover:text-yellow-500 transition-colors">Mapa de tiendas</a>
              <a className="link link-hover hover:text-yellow-500 transition-colors">Ofertas del día</a>
            </nav> 

            <nav className="flex flex-col gap-2">
              <h6 className="footer-title text-yellow-500 opacity-100 mb-2">Ayuda</h6> 
              <a className="link link-hover hover:text-yellow-500 transition-colors">Centro de soporte</a>
              <a className="link link-hover hover:text-yellow-500 transition-colors">Envíos y devoluciones</a>
              <a className="link link-hover hover:text-yellow-500 transition-colors">Preguntas frecuentes</a>
            </nav>
          </div>
        </div>

        {/* Zona Inferior: Redes Sociales y Copyright */}
        <div className="flex justify-between items-center p-4 px-10 border-t border-white/10 bg-black/20">
          <p className="text-sm opacity-70">© 2026 LocalMarkt. Todos los derechos reservados.</p>
          
          <nav className="flex gap-4">
            <a className="cursor-pointer hover:scale-110 hover:text-yellow-500 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a className="cursor-pointer hover:scale-110 hover:text-yellow-500 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a className="cursor-pointer hover:scale-110 hover:text-yellow-500 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
          </nav>
        </div>

      </div>
    </footer>
  );
};