import { Link } from "wouter";
import { Store, User, Mail, Lock, ArrowRight, ShoppingBag, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export const RegisterPage = () => {
    // TODO: Aquí añadirás los estados (useState) para email, password, nombre, tipo de cuenta, etc.
    // TODO: Aquí añadirás la función handleSubmit o handleRegister
    // ACORDARSE DE CAMBIAR LOS NOMBRES EN EL FETCH DE REACT PARA QUE SE ENVIEN nombreUsuario y nombreComercio/Tienda

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 sm:p-8">
            
            {/* Contenedor Principal Split-Screen animado */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-5xl bg-base-100 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/20 z-10"
            >
                
                {/* LADO IZQUIERDO: Branding y Bienvenida */}
                <div className="md:w-5/12 bg-jungle_teal-300 p-10 flex flex-col relative overflow-hidden text-white border-r border-white/10 shadow-inner">
                    
                    {/* IMAGEN DEL LOGO EN LA ESQUINA SUPERIOR IZQUIERDA (Efecto Espejo) */}
                    <div className="absolute -top-20 -left-32 w-110 h-110 opacity-95 pointer-events-none drop-shadow-2xl">
                        <img 
                            src="/logo.png" 
                            alt="Logo LocalMarkt" 
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Espaciador para empujar el texto hacia abajo */}
                    <div className="flex-1 min-h-55"></div>

                    {/* Textos alineados a la izquierda */}
                    <div className="relative z-10 text-left mt-auto">
                        <h3 className="font-black text-3xl tracking-tight text-white mb-6">
                            LocalMarkt
                        </h3>
                        <h2 className="text-4xl font-black mb-4 leading-tight tracking-tight text-yellow-400">
                            El barrio en <br/> <span className="text-yellow-500/65">tu bolsillo</span>
                        </h2>
                        <p className="text-white/60 text-lg font-medium max-w-sm mb-8">
                            Únete a la comunidad. Compra productos frescos, apoya al comercio local y descubre los tesoros de tu ciudad.
                        </p>
                        
                        <div className="flex items-center gap-3 text-sm font-bold bg-white/10 w-fit px-4 py-3 rounded-xl backdrop-blur-sm border border-white/20 shadow-lg">
                            <MapPin size={20} className="text-yellow-400" />
                            Más de 500 comercios ya están aquí
                        </div>
                    </div>
                </div>

                {/* ========================================== */}
                {/* LADO DERECHO: Formulario de Registro         */}
                {/* ========================================== */}
                <div className="md:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-base-100 relative">
                    
                    <div className="mb-8">
                        <h1 className="text-4xl font-black text-base-content mb-3 leading-tight tracking-tight">Crear una cuenta</h1>
                        <p className="text-base-content/60 text-lg font-medium">¿Cómo te gustaría unirte a nosotros?</p>
                    </div>

                    {/* SELECTOR DE TIPO DE CUENTA (TABS) */}
                    {/* TODO: Añadir lógica onClick para alternar la clase visual y el estado */}
                    <div className="flex bg-base-200 p-1.5 rounded-2xl mb-8 border border-base-300 shadow-sm">
                        
                        {/* Botón Pestaña: Cliente (Visualmente Activo por defecto) */}
                        <button type="button" className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-base-100 text-base-content shadow-sm font-bold text-sm transition-all cursor-pointer">
                            <User size={18} />
                            Soy Cliente
                        </button>
                        
                        {/* Botón Pestaña: Comercio (Visualmente Inactivo) */}
                        <button type="button" className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-transparent text-base-content/60 hover:text-base-content font-bold text-sm transition-all hover:bg-base-200/50 cursor-pointer">
                            <Store size={18} />
                            Soy Comercio
                        </button>
                    </div>

                    {/* FORMULARIO */}
                    {/* TODO: Añadir onSubmit al form */}
                    <form className="flex flex-col gap-6">
                        
                        {/* --- ZONA CONDICIONAL --- */}
                        {/* TODO: Renderizar dinámicamente según la pestaña seleccionada */}
                        
                        {/* Campos para CLIENTE */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-base-content/70 ml-1">Nombre completo</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40">
                                    <User size={18} />
                                </div>
                                {/* Mismas clases actualizadas del Login */}
                                <input 
                                    type="text" 
                                    placeholder="Ej. Laura Gómez" 
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-base-200/50 border-2 border-transparent text-base text-base-content outline-none focus:bg-base-100 focus:border-jungle_teal focus:ring-2 focus:ring-jungle_teal/10 transition-all"
                                />
                            </div>
                        </div>

                        {/* Campos para COMERCIO (Comentado para cuando lo necesites) */}
                        {/* <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-base-content/70 ml-1">Nombre de la Tienda</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40">
                                    <Store size={18} />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="Ej. Frutería Loli" 
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-base-200/50 border-2 border-transparent text-base text-base-content outline-none focus:bg-base-100 focus:border-jungle_teal focus:ring-2 focus:ring-jungle_teal/10 transition-all"
                                />
                            </div>
                        </div>
                        */}

                        {/* --- ZONA COMÚN (Email y Contraseña) --- */}
                        
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-base-content/70 ml-1">Correo Electrónico</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40">
                                    <Mail size={18} />
                                </div>
                                <input 
                                    type="email" 
                                    placeholder="tu@email.com" 
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-base-200/50 border-2 border-transparent text-base text-base-content outline-none focus:bg-base-100 focus:border-jungle_teal focus:ring-2 focus:ring-jungle_teal/10 transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-base-content/70 ml-1">Contraseña</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40">
                                    <Lock size={18} />
                                </div>
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-base-200/50 border-2 border-transparent text-base text-base-content outline-none focus:bg-base-100 focus:border-jungle_teal focus:ring-2 focus:ring-jungle_teal/10 transition-all"
                                />
                            </div>
                        </div>

                        {/* TODO: Añadir bloque de errores {error && (...)} igual que en Login */}

                        {/* Botón de Enviar */}
                        <button type="submit" className="btn bg-jungle_teal hover:bg-sea_green text-white border-none rounded-xl h-14 mt-4 shadow-md shadow-jungle_teal/20 text-lg font-bold">
                            {/* TODO: Renderizado condicional del spinner {loading ? ... : ... } */}
                            Comenzar ahora <ArrowRight size={20} className="ml-1" />
                        </button>
                    </form>

                    {/* Footer del Formulario */}
                    <div className="mt-10 text-center">
                        <p className="text-base font-medium text-base-content/70">
                            ¿Ya tienes una cuenta? {' '}
                            <Link href="/login">
                                <a className="text-jungle_teal font-bold hover:underline cursor-pointer">
                                    Inicia sesión aquí
                                </a>
                            </Link>
                        </p>
                    </div>

                </div>
            </motion.div>
        </div>
    );
};