export const RegisterShopModal = () => {
  return (
    <dialog id="register_shop_modal" className="modal modal-bottom sm:modal-middle">
      
      {/* El ID arriba es vital. La clase 'modal-bottom sm:modal-middle' hace que 
          en móvil salga desde abajo y en PC aparezca en el centro. */}
          
      <div className="modal-box bg-base-100 text-base-content rounded-t-3xl sm:rounded-3xl border border-base-200 shadow-2xl">
        
        {/* Cabecera del modal */}
        <h3 className="font-black text-2xl mb-2 text-jungle_teal">
            ¡Quiero registrar mi tienda!
        </h3>
        <p className="text-base-content/70 text-sm mb-6">
          Déjanos tus datos y nos pondremos en contacto contigo para configurar tu tienda en LocalMarkt en menos de 24 horas.
        </p>

        {/* --- AQUÍ IRÁ EL FUTURO FORMULARIO --- */}
        <div className="py-4 flex flex-col gap-4">
          <input type="name" className="h-12 w-full bg-base-200 rounded-xl flex items-center px-4 opacity-50 border border-dashed border-base-300" placeholder="[ Espacio para Nombre de la Tienda ]">
          </input>
          <input type="email" className="h-12 w-full bg-base-200 rounded-xl flex items-center px-4 opacity-50 border border-dashed border-base-300" placeholder="[ Espacio para Email/Teléfono ]">
          </input>
        </div>
        {/* ------------------------------------- */}

        {/* Botones de acción */}
        <div className="modal-action mt-6">
          {/* El method="dialog" hace que cualquier botón dentro del form cierre el modal */}
          <form method="dialog" className="flex gap-3 w-full sm:w-auto">
            <button className="btn btn-ghost text-base-content/60 hover:bg-base-200 flex-1 sm:flex-none rounded-xl">
              Cancelar
            </button>
            <button className="btn bg-jungle_teal hover:bg-sea_green text-white border-none flex-1 sm:flex-none rounded-xl shadow-lg shadow-jungle_teal/20">
              Enviar solicitud
            </button>
          </form>
        </div>
      </div>

      {/* Fondo oscuro para cerrar al hacer clic fuera */}
      <form method="dialog" className="modal-backdrop bg-base-100/50 backdrop-blur-sm">
        <button>cerrar</button>
      </form>
    </dialog>
  );
};