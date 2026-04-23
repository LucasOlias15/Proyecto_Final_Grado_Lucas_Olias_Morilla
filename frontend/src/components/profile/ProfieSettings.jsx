import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Lock } from "lucide-react";
import useToastStore from "../../store/useToastStore";

export const ProfileSettings = ({ user, setUser, showSettings, setShowSettings }) => {
  const toast = useToastStore();
  
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    claveActual: "",
    nuevaClave: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || "",
        email: user.email || "",
        claveActual: "",
        nuevaClave: "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.claveActual) {
      toast.warning("Debes introducir tu contraseña actual para guardar los cambios.");
      return;
    }
    
    const updatedData = {
      nombre: formData.nombre,
      email: formData.email,
      clave: formData.claveActual,
      ...(formData.nuevaClave && { nuevaClave: formData.nuevaClave }),
    };
    
    try {
      const response = await fetch(`http://localhost:3000/api/users/perfil`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedData),
      });
      
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("¡Perfil actualizado con éxito!");
        setFormData((prev) => ({ ...prev, claveActual: "", nuevaClave: "" }));
        setShowSettings(false);
      } else {
        toast.error(data.error || "No se pudo actualizar el perfil");
      }
    } catch (error) {
      console.error("Error de red:", error);
      toast.error("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="bg-base-200 rounded-[2.5rem] p-8 shadow-sm border border-base-300 transition-all duration-300 relative overflow-hidden mt-6">
      <div
        onClick={() => setShowSettings(!showSettings)}
        className="flex items-center justify-between group cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-500 ${
              showSettings
                ? "bg-yellow-500 text-white"
                : "bg-base-200 text-base-content group-hover:bg-yellow-100 group-hover:text-yellow-600"
            }`}
          >
            <Settings
              className={`w-7 h-7 transition-transform duration-500 ${
                showSettings ? "rotate-90" : ""
              }`}
            />
          </div>
          <div>
            <h2 className="text-2xl font-black text-base-content">
              Ajustes de la cuenta
            </h2>
            <p className="text-base-content/60 text-sm mt-1">
              Modifica tus datos, contraseña y privacidad.
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSave} className="mt-8 pt-8 border-t border-base-200">
              <div className="mb-6 p-5 bg-yellow-700 border border-yellow-500 rounded-2xl flex gap-3 items-start">
                <Lock className="text-yellow-300" />
                <p className="text-sm font-medium text-yellow-300">
                  Por tu seguridad, necesitas introducir tu contraseña actual para guardar cualquier cambio.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-base-content/70 ml-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-2xl bg-base-300 border-2 border-transparent text-base-content placeholder:text-base-content/40 outline-none focus:bg-base-100 focus:border-jungle_teal focus:ring-4 focus:ring-jungle_teal/10 transition-all font-medium"
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-base-content/70 ml-2">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-2xl bg-base-300 border-2 border-transparent text-base-content placeholder:text-base-content/40 outline-none focus:bg-base-100 focus:border-jungle_teal focus:ring-4 focus:ring-jungle_teal/10 transition-all font-medium"
                    placeholder="tu@email.com"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-base-content/70 ml-2 flex items-center gap-1">
                    Contraseña Actual <span className="text-error">*</span>
                  </label>
                  <input
                    type="password"
                    name="claveActual"
                    value={formData.claveActual}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 rounded-2xl bg-base-300 border-2 border-transparent text-base-content placeholder:text-base-content/40 outline-none focus:bg-base-100 focus:border-error focus:ring-4 focus:ring-error/10 transition-all font-medium"
                    placeholder="Obligatoria para guardar"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-base-content/70 ml-2 flex items-center justify-between">
                    <span>Nueva Contraseña</span>
                    <span className="text-[10px] font-normal lowercase opacity-70">(opcional)</span>
                  </label>
                  <input
                    type="password"
                    name="nuevaClave"
                    value={formData.nuevaClave}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-2xl bg-base-300 border-2 border-transparent text-base-content placeholder:text-base-content/40 outline-none focus:bg-base-100 focus:border-jungle_teal focus:ring-4 focus:ring-jungle_teal/10 transition-all font-medium"
                    placeholder="Dejar en blanco si no cambia"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
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
        )}
      </AnimatePresence>
    </div>
  );
};