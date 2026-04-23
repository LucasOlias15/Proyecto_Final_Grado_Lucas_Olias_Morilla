import { Link } from "wouter";
import { Heart, ArrowRight, NotebookPen } from "lucide-react";

export const ClientSection = ({ 
  showFavorites, 
  setShowFavorites, 
  showValoraciones, 
  setShowValoraciones,
  fetchValoracionesCliente 
}) => {
  
  const handleValoracionesClick = () => {
    setShowValoraciones(!showValoraciones);
    if (!showValoraciones) {
      fetchValoracionesCliente();
      setShowFavorites(false);
    }
  };

  const handleFavoritesClick = () => {
    setShowFavorites(!showFavorites);
    if (!showFavorites) {
      setShowValoraciones(false);
    }
  };

  return (
    <>
      {/* BLOQUE CLIENTE 1: Historial de Pedidos */}
      <div className="md:col-span-1 bg-base-200 rounded-[2.5rem] p-8 shadow-sm border border-base-300 hover:shadow-md hover:border-jungle_teal/40 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full bg-linear-to-l from-base-200/50 to-transparent pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-black mb-2 text-base-content group-hover:text-jungle_teal transition-colors">
            Historial de Pedidos
          </h2>
          <p className="text-base-content/60 max-w-sm text-sm">
            Revisa tus compras recientes.
          </p>
        </div>
        <div className="mt-8 flex justify-end relative z-10">
          <Link href="/perfil/pedidos">
            <span className="text-sm font-bold text-jungle_teal uppercase tracking-widest bg-jungle_teal/10 px-5 py-3 rounded-2xl group-hover:bg-jungle_teal group-hover:text-white transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2">
              Ver pedidos <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>

      {/* BLOQUE CLIENTE 2: Mis Valoraciones */}
      <div
        onClick={handleValoracionesClick}
        className={`md:col-span-1 rounded-[2.5rem] p-8 shadow-sm transition-all duration-300 cursor-pointer flex flex-col justify-center relative overflow-hidden ${
          showValoraciones
            ? "bg-amber-500 text-white shadow-xl shadow-amber-500/20 scale-[0.97]"
            : "bg-amber-600 text-white hover:bg-amber-500 hover:-translate-y-1"
        }`}
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="relative z-10">
          <span className="text-4xl mb-3 block"><NotebookPen className="w-12 h-12 mb-3 "/></span>
          <h2 className="font-black opacity-90 uppercase tracking-wider text-sm mb-1">
            Mis Valoraciones
          </h2>
          <p className="text-white/80 text-sm font-medium">Ver mis reseñas</p>
        </div>
      </div>

      {/* BLOQUE CLIENTE 3: Favoritos */}
      <div
        onClick={handleFavoritesClick}
        className={`md:col-span-1 rounded-[2.5rem] p-8 shadow-sm transition-all duration-300 cursor-pointer flex flex-col justify-center relative overflow-hidden ${
          showFavorites
            ? "bg-red-500 text-white shadow-xl shadow-red-500/20 scale-[0.97]"
            : "bg-jungle_teal text-white hover:bg-sea_green hover:-translate-y-1"
        }`}
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="relative z-10">
          <Heart
            className={`w-12 h-12 mb-3 transition-all duration-500 ${
              showFavorites ? "fill-white drop-shadow-md scale-110" : "fill-white/20"
            }`}
          />
          <h2 className="font-black opacity-90 uppercase tracking-wider text-sm mb-1">
            Tus Favoritos
          </h2>
          <p className="text-white/80 text-sm font-medium">Ver guardados</p>
        </div>
      </div>
    </>
  );
};