import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";

export const ForgotPasswordModal = () => {
  const [email, setEmail] = useState("");
  const [paso, setPaso] = useState("formulario"); // "formulario" | "verificando" | "enviado" | "no_existe" | "error"
  const [mensajeError, setMensajeError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setPaso("verificando");

    try {
      // 1. Verificar si el email existe en la BD
      const res = await fetch("http://localhost:3000/api/users/verificar-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
        setPaso("error");
        setMensajeError("Error de conexión con el servidor.");
        return;
      }

      const data = await res.json();

      if (data.existe) {
        // Email encontrado → simular envío
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setPaso("enviado");
      } else {
        // Email NO encontrado
        setPaso("no_existe");
      }
    } catch (error) {
      console.error("Error verificando email:", error);
      setPaso("error");
      setMensajeError("No se pudo conectar con el servidor.");
    }
  };

  const handleReintentar = () => {
    setPaso("formulario");
    setEmail("");
  };

  const handleClose = () => {
    document.getElementById("forgot_password_modal").close();
    setTimeout(() => {
      setEmail("");
      setPaso("formulario");
      setMensajeError("");
    }, 300);
  };

  return (
    <dialog id="forgot_password_modal" className="modal">
      <div className="modal-box bg-base-100 rounded-2xl shadow-2xl max-w-md p-0 overflow-hidden">
        
        {/* Cabecera con gradiente */}
        <div className={`bg-linear-to-r p-6 text-white ${
          paso === "no_existe" || paso === "error" 
            ? "from-error to-red-500" 
            : "from-jungle_teal to-sea_green"
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              {paso === "enviado" ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : paso === "no_existe" || paso === "error" ? (
                <XCircle className="w-5 h-5" />
              ) : (
                <Mail className="w-5 h-5" />
              )}
            </div>
            <h3 className="font-black text-xl">
              {paso === "enviado" && "¡Revisa tu bandeja!"}
              {paso === "no_existe" && "Email no encontrado"}
              {paso === "error" && "Error"}
              {paso === "verificando" && "Verificando..."}
              {paso === "formulario" && "Recuperar contraseña"}
            </h3>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {paso === "formulario" && (
              <motion.div
                key="formulario"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-base-content/70 mb-6">
                  Introduce tu correo electrónico y te enviaremos un enlace para 
                  restablecer tu contraseña.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-base-content/50 ml-2 mb-2 block">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                      className="input input-bordered w-full bg-base-200 rounded-xl"
                      autoFocus
                    />
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="btn btn-ghost flex-1 rounded-xl"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={!email.trim()}
                      className="btn bg-jungle_teal hover:bg-sea_green text-white border-none flex-1 rounded-xl gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Enviar enlace
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {paso === "verificando" && (
              <motion.div
                key="verificando"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <span className="loading loading-spinner loading-lg text-jungle_teal mb-4"></span>
                <p className="text-base-content/60">Verificando tu email...</p>
              </motion.div>
            )}

            {paso === "enviado" && (
              <motion.div
                key="enviado"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-4"
              >
                <div className="w-16 h-16 rounded-full bg-jungle_teal/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-jungle_teal" />
                </div>
                <p className="text-base-content/80 mb-4">
                  Si el correo <strong className="text-base-content">{email}</strong> está registrado, 
                  recibirás un enlace para restablecer tu contraseña en unos minutos.
                </p>
                <p className="text-xs text-base-content/40 italic mb-6">
                  (Funcionalidad simulada - En producción se enviaría un email real)
                </p>

                <button
                  onClick={handleClose}
                  className="btn bg-jungle_teal text-white border-none rounded-xl w-full"
                >
                  Entendido
                </button>
              </motion.div>
            )}

            {paso === "no_existe" && (
              <motion.div
                key="no_existe"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-4"
              >
                <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
                  <XCircle className="w-8 h-8 text-error" />
                </div>
                <p className="text-base-content/80 mb-2">
                  No hemos encontrado ninguna cuenta asociada a
                </p>
                <p className="font-bold text-base-content mb-6">{email}</p>
                <p className="text-sm text-base-content/50 mb-6">
                  Comprueba que has escrito bien el correo o{" "}
                  <a href="/registro" className="text-jungle_teal hover:underline font-bold">
                    crea una cuenta nueva
                  </a>
                  .
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={handleClose}
                    className="btn btn-ghost flex-1 rounded-xl"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleReintentar}
                    className="btn bg-jungle_teal text-white border-none flex-1 rounded-xl gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Intentar de nuevo
                  </button>
                </div>
              </motion.div>
            )}

            {paso === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-4"
              >
                <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
                  <XCircle className="w-8 h-8 text-error" />
                </div>
                <p className="text-base-content/80 mb-6">{mensajeError}</p>

                <div className="flex gap-3">
                  <button
                    onClick={handleClose}
                    className="btn btn-ghost flex-1 rounded-xl"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleReintentar}
                    className="btn bg-jungle_teal text-white border-none flex-1 rounded-xl gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Reintentar
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop bg-black/60 backdrop-blur-sm">
        <button>cerrar</button>
      </form>
    </dialog>
  );
};