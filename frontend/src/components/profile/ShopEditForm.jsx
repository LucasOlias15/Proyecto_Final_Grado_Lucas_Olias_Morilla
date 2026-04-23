import { useRef } from "react";
import { motion } from "framer-motion";
import { Store, Tags } from "lucide-react";
import { LocationPicker } from "../map/LocationPicker";

export const ShopEditForm = ({ 
  shopFormData, 
  setShopFormData, 
  imagenPreview, 
  imagenFile,
  setImagenFile,
  setImagenPreview,
  onLocationSelect,
  onImageChange,
  onSubmit,
  onCancel,
  toast 
}) => {
  const fileInputRef = useRef(null);

  const handleShopInputChange = (e) => {
    setShopFormData({
      ...shopFormData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <form onSubmit={onSubmit} className="mt-8 pt-8 border-t border-base-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Nombre */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-base-content/70 ml-2">
              Nombre del comercio
            </label>
            <input
              type="text"
              name="nombre"
              value={shopFormData.nombre}
              onChange={handleShopInputChange}
              required
              className="w-full p-4 rounded-2xl bg-base-300 border-2 border-transparent text-base-content placeholder:text-base-content/40 outline-none focus:bg-base-100 focus:border-jungle_teal focus:ring-4 focus:ring-jungle_teal/10 transition-all font-medium"
            />
          </div>

          {/* Categoría */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-base-content/70 ml-2">
              Categoría
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40">
                <Tags size={18} />
              </div>
              <select
                name="categoria"
                value={shopFormData.categoria}
                onChange={handleShopInputChange}
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-base-300 border-2 border-transparent text-base-content outline-none focus:bg-base-100 focus:border-jungle_teal focus:ring-4 focus:ring-jungle_teal/10 transition-all appearance-none cursor-pointer font-bold"
              >
                <option value="" disabled>Seleccionar categoría...</option>
                <option value="Frutería">Frutería</option>
                <option value="Panadería">Panadería</option>
                <option value="Carnicería">Carnicería</option>
                <option value="Pescadería">Pescadería</option>
                <option value="Pastelería">Pastelería</option>
                <option value="Bio">Productos Bio/Eco</option>
                <option value="Artesanía y regalos">Artesanía y Regalos</option>
                <option value="Textiles y moda">Textiles y Moda</option>
                <option value="Otros">Otros</option>
              </select>
            </div>
          </div>

          {/* Contacto */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-base-content/70 ml-2">
              Contacto (teléfono/email)
            </label>
            <input
              type="text"
              name="contacto"
              value={shopFormData.contacto}
              onChange={handleShopInputChange}
              required
              className="w-full p-4 rounded-2xl bg-base-300 border-2 border-transparent text-base-content placeholder:text-base-content/40 outline-none focus:bg-base-100 focus:border-jungle_teal focus:ring-4 focus:ring-jungle_teal/10 transition-all font-medium"
            />
          </div>

          {/* Dirección */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-base-content/70 ml-2">
              Dirección
            </label>
            <input
              type="text"
              name="direccion"
              value={shopFormData.direccion}
              onChange={handleShopInputChange}
              required
              className="w-full p-4 rounded-2xl bg-base-300 border-2 border-transparent text-base-content placeholder:text-base-content/40 outline-none focus:bg-base-100 focus:border-jungle_teal focus:ring-4 focus:ring-jungle_teal/10 transition-all font-medium"
            />
          </div>

          {/* Ubicación en el mapa */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-base-content/70 ml-2">
              Ubicación en el mapa
            </label>
            <LocationPicker
              onLocationSelect={onLocationSelect}
              onError={(mensaje) => toast.error(mensaje)}
              initialCoords={
                shopFormData.latitud && shopFormData.longitud
                  ? {
                      lat: parseFloat(shopFormData.latitud),
                      lng: parseFloat(shopFormData.longitud),
                    }
                  : null
              }
            />
            {shopFormData.latitud && shopFormData.longitud && (
              <p className="text-xs text-base-content/50 mt-1">
                Coordenadas: {shopFormData.latitud}, {shopFormData.longitud}
              </p>
            )}
          </div>

          {/* Descripción */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-base-content/70 ml-2">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={shopFormData.descripcion}
              onChange={handleShopInputChange}
              rows="3"
              className="w-full p-4 rounded-2xl bg-base-300 border-2 border-transparent text-base-content placeholder:text-base-content/40 outline-none focus:bg-base-100 focus:border-jungle_teal focus:ring-4 focus:ring-jungle_teal/10 transition-all font-medium"
            ></textarea>
          </div>

          {/* Sección de imagen */}
          <div className="md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-widest text-base-content/70 ml-2 mb-2 block">
              Imagen del comercio
            </label>
            <div className="flex items-start gap-4">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-dashed border-base-300 bg-base-100 flex items-center justify-center">
                {imagenPreview ? (
                  <img src={imagenPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Store className="w-8 h-8 text-base-content/30" />
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                  ref={fileInputRef}
                  className="file-input file-input-bordered w-full max-w-xs"
                />
                <p className="text-xs text-base-content/50 mt-2">
                  Sube una nueva imagen (opcional).
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-ghost text-base-content/60 hover:bg-error/10 hover:text-error rounded-xl transition-colors font-bold"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn bg-sea_green hover:bg-jungle_teal text-white font-bold rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 border-none px-8"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </motion.div>
  );
};