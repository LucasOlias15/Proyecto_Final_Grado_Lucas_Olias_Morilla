import { Link } from "wouter";
import { Store, User, Mail, Lock, ArrowRight, ShoppingBag, MapPin } from "lucide-react";

export const RegisterPage = () => {
    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 sm:p-8">
            
            {/* Contenedor Principal de la Tarjeta */}
            <div className="w-full max-w-5xl bg-base-100 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
                
                {/* ========================================== */}
                {/* LADO IZQUIERDO: Branding y Bienvenida        */}
                {/* ========================================== */}
                <div className="md:w-5/12 bg-jungle_teal p-10 flex flex-col justify-between relative overflow-hidden text-white">
                    {/* Elemento decorativo de fondo */}
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-black/10 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative z-10">
                        <Link href="/">
                            <a className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity w-fit cursor-pointer">
                                <ShoppingBag size={28} strokeWidth={2.5} />
                                <span className="font-black text-2xl tracking-tight">LocalMarkt</span>
                            </a>
                        </Link>
                    </div>

                    <div className="relative z-10 mt-12 md:mt-0">
                        <h2 className="text-4xl font-black mb-4 leading-tight">
                            El barrio en <br/> tu bolsillo.
                        </h2>
                        <p className="text-white/80 text-lg font-medium mb-8">
                            Únete a la comunidad. Compra productos frescos, apoya al comercio local y descubre los tesoros de tu ciudad.
                        </p>
                        
                        <div className="flex items-center gap-3 text-sm font-bold bg-white/10 w-fit px-4 py-2 rounded-xl backdrop-blur-sm border border-white/20">
                            <MapPin size={18} className="text-yellow-400" />
                            Más de 500 comercios ya están aquí
                        </div>
                    </div>
                </div>

                {/* ========================================== */}
                {/* LADO DERECHO: Formulario de Registro         */}
                {/* ========================================== */}
                <div className="md:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-base-100 relative">
                    
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-base-content mb-2">Crear una cuenta</h1>
                        <p className="text-base-content/60 font-medium">¿Cómo te gustaría unirte a nosotros?</p>
                    </div>

                    {/* SELECTOR DE TIPO DE CUENTA (TABS) */}
                    {/* Nota: Aquí tendrás que añadir la lógica onClick para cambiar visualmente la pestaña activa */}
                    <div className="flex bg-base-200 p-1.5 rounded-2xl mb-8 border border-base-300 shadow-sm">
                        
                        {/* Botón Pestaña: Cliente (Visualmente Activo por defecto en este mock) */}
                        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-base-100 text-base-content shadow-sm font-bold text-sm transition-all">
                            <User size={18} />
                            Soy Cliente
                        </button>
                        
                        {/* Botón Pestaña: Comercio (Visualmente Inactivo en este mock) */}
                        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-transparent text-base-content/60 hover:text-base-content font-bold text-sm transition-all hover:bg-base-200/50">
                            <Store size={18} />
                            Soy Comercio
                        </button>
                    </div>

                    {/* FORMULARIO */}
                    <form className="flex flex-col gap-5">
                        
                        {/* --- ZONA CONDICIONAL --- */}
                        {/* Aquí renderizarás unos campos u otros según la pestaña */}
                        
                        {/* Campos para CLIENTE */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-base-content/70 ml-1">Nombre completo</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40">
                                    <User size={18} />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="Ej. Laura Gómez" 
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-base-200/50 border-2 border-transparent text-sm text-base-content outline-none focus:bg-base-100 focus:border-jungle_teal transition-all"
                                />
                            </div>
                        </div>

                        {/* Campos para COMERCIO (Los dejo comentados visualmente para que los tengas listos) */}
                        {/* <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-base-content/70 ml-1">Nombre de la Tienda</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40">
                                    <Store size={18} />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="Ej. Frutería Loli" 
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-base-200/50 border-2 border-transparent text-sm text-base-content outline-none focus:bg-base-100 focus:border-jungle_teal transition-all"
                                />
                            </div>
                        </div>
                        */}

                        {/* --- ZONA COMÚN (Para ambos) --- */}
                        
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-base-content/70 ml-1">Correo Electrónico</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40">
                                    <Mail size={18} />
                                </div>
                                <input 
                                    type="email" 
                                    placeholder="tu@email.com" 
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-base-200/50 border-2 border-transparent text-sm text-base-content outline-none focus:bg-base-100 focus:border-jungle_teal transition-all"
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
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-base-200/50 border-2 border-transparent text-sm text-base-content outline-none focus:bg-base-100 focus:border-jungle_teal transition-all"
                                />
                            </div>
                        </div>

                        {/* Botón de Enviar */}
                        <button type="button" className="btn bg-jungle_teal hover:bg-sea_green text-white border-none rounded-xl h-12 mt-2 shadow-md shadow-jungle_teal/20 text-base">
                            Comenzar ahora <ArrowRight size={18} className="ml-1" />
                        </button>
                    </form>

                    {/* Footer del Formulario */}
                    <div className="mt-8 text-center">
                        <p className="text-sm font-medium text-base-content/70">
                            ¿Ya tienes una cuenta? {' '}
                            <Link href="/login">
                                <a className="text-jungle_teal font-bold hover:underline cursor-pointer">
                                    Inicia sesión aquí
                                </a>
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};