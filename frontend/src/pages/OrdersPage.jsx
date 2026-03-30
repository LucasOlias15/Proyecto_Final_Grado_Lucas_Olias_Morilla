import { useState } from "react";
import { Link } from "wouter";
import { 
    Package, Store, Clock, CheckCircle2, XCircle, SearchX, ArrowRight, 
    ShoppingBag, Banana, Croissant, Beef, Leaf, Shirt, Amphora 
} from "lucide-react";

export const OrdersPage = () => {
    // 1. ESTADO PARA LAS PESTAÑAS (Filtros)
    const [activeTab, setActiveTab] = useState("Todos");

    // 2. DATOS FALSOS (MOCKS) - ¡Ahora con categorías!
    // Prueba a vaciar este array ( const mockPedidos = []; ) para ver la pantalla de "Cero pedidos"
    const mockPedidos = [
        {
            id: "LM-9823",
            fecha: "24 Mar 2026",
            tienda: "Panadería El Horno",
            categoria: "Panadería",
            estado: "En proceso",
            total: "12.50€",
            resumen: "3 artículos: Pan de masa madre, Croissants (x2)..."
        },
        {
            id: "LM-9710",
            fecha: "20 Mar 2026",
            tienda: "Frutas Paco",
            categoria: "Frutería",
            estado: "Completado",
            total: "24.90€",
            resumen: "8 artículos: Plátanos de Canarias, Manzanas Fuji..."
        },
        {
            id: "LM-9655",
            fecha: "15 Mar 2026",
            tienda: "Carnicería Selecta",
            categoria: "Carnicería",
            estado: "Cancelado",
            total: "35.00€",
            resumen: "2 artículos: Chuletón de vaca madurada, Costillas..."
        }
    ];

    const pestañas = ["Todos", "En proceso", "Completado", "Cancelado"];

    // --- FUNCIONES AUXILIARES VISUALES ---

    // 1. Renderiza el icono de la tienda según su categoría
    const getIconoCategoria = (categoria) => {
        switch (categoria) {
            case "Frutería": return <Banana className="text-yellow-500" size={20} />;
            case "Panadería": return <Croissant className="text-orange-400" size={20} />;
            case "Carnicería": return <Beef className="text-red-500" size={20} />;
            case "Bio": return <Leaf className="text-sea_green" size={20} />;
            case "Textiles y moda": return <Shirt className="text-purple-500" size={20} />;
            case "Artesanía y regalos": return <Amphora className="text-blue-500" size={20} />;
            default: return <Store className="text-jungle_teal" size={20} />;
        }
    };

    // 2. Renderiza el badge de estado
    const renderEstadoBadge = (estado) => {
        switch (estado) {
            case "En proceso":
                return <span className="badge bg-yellow-400 text-yellow-900 border-none font-bold gap-1 p-3"><Clock size={14} /> En proceso</span>;
            case "Completado":
                return <span className="badge bg-sea_green text-white border-none font-bold gap-1 p-3"><CheckCircle2 size={14} /> Completado</span>;
            case "Cancelado":
                return <span className="badge bg-red-500 text-white border-none font-bold gap-1 p-3"><XCircle size={14} /> Cancelado</span>;
            default:
                return <span className="badge">{estado}</span>;
        }
    };

    // --- LÓGICA DE FILTRADO ---
    
    // Comprobamos si el usuario tiene pedidos en su historial general
    const tieneHistorial = mockPedidos.length > 0;
    
    // Filtramos según la pestaña seleccionada
    const pedidosFiltrados = mockPedidos.filter(
        pedido => activeTab === "Todos" || pedido.estado === activeTab
    );

    return (
        <div className="min-h-screen bg-base-100/50 pb-20">
            <div className="max-w-4xl mx-auto px-4 pt-12">
                
                {/* --- ENCABEZADO (HERO) --- */}
                <header className="mb-10 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-black text-base-content flex items-center justify-center md:justify-start gap-3 mb-3">
                        <Package className="text-jungle_teal" size={40} strokeWidth={2.5} />
                        Mis Pedidos
                    </h1>
                    <p className="text-base-content/60 text-lg font-medium">
                        Revisa tus compras recientes y haz seguimiento de tus productos locales.
                    </p>
                </header>

                {/* Si no tiene NINGÚN pedido en su cuenta, no mostramos ni las pestañas */}
                {!tieneHistorial ? (
                    
                    /* --- ESTADO VACÍO ABSOLUTO (Usuario sin compras) --- */
                    <div className="flex flex-col items-center justify-center text-center p-12 bg-base-100 rounded-[3rem] border border-base-200 shadow-sm mt-10">
                        <div className="w-32 h-32 mb-6 text-jungle_teal/30 relative">
                            <ShoppingBag className="w-full h-full" strokeWidth={1} />
                        </div>
                        <h3 className="font-black text-3xl text-base-content mb-3">Tu cesta está muy vacía</h3>
                        <p className="text-base-content/60 text-lg max-w-md mb-8">
                            Aún no has realizado ningún pedido en LocalMarkt. ¡Es el momento perfecto para descubrir las joyas de tu barrio!
                        </p>
                        <Link href="/explorar">
                            <a className="btn bg-jungle_teal text-white border-none rounded-full px-8 hover:bg-sea_green text-lg h-12">
                                Empezar a explorar
                            </a>
                        </Link>
                    </div>

                ) : (
                    <>
                        {/* --- FILTROS (TABS) --- */}
                        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 [&::-webkit-scrollbar]:hidden">
                            {pestañas.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all
                                        ${activeTab === tab 
                                            ? "bg-jungle_teal text-white shadow-md shadow-jungle_teal/30" 
                                            : "bg-base-200 text-base-content/70 hover:bg-base-300"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* --- LISTA DE PEDIDOS --- */}
                        <div className="flex flex-col gap-6">
                            {pedidosFiltrados.length > 0 ? (
                                pedidosFiltrados.map((pedido) => (
                                    <div key={pedido.id} className="bg-base-100 rounded-[2rem] p-6 sm:p-8 shadow-sm border border-base-200 hover:shadow-md transition-shadow">
                                        
                                        {/* Cabecera de la Tarjeta */}
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-base-200 pb-4 mb-4 gap-4">
                                            <div>
                                                <p className="text-xs font-bold text-base-content/50 uppercase tracking-wider mb-1">Pedido {pedido.id}</p>
                                                <p className="text-sm font-medium text-base-content/70">{pedido.fecha}</p>
                                            </div>
                                            <div>
                                                {renderEstadoBadge(pedido.estado)}
                                            </div>
                                        </div>

                                        {/* Cuerpo de la Tarjeta */}
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-base-content flex items-center gap-2 mb-2">
                                                    {/* 👇 AQUÍ VA EL ICONO DINÁMICO 👇 */}
                                                    {getIconoCategoria(pedido.categoria)}
                                                    {pedido.tienda}
                                                </h3>
                                                <p className="text-base-content/70 text-sm">
                                                    {pedido.resumen}
                                                </p>
                                            </div>
                                            <div className="text-left sm:text-right shrink-0">
                                                <p className="text-xs text-base-content/50 font-bold uppercase mb-1">Total Pagado</p>
                                                <p className="text-3xl font-black text-jungle_teal">{pedido.total}</p>
                                            </div>
                                        </div>

                                        {/* Pie de la Tarjeta (Acciones) */}
                                        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 pt-6 border-t border-base-200/50">
                                            <button className="btn btn-outline border-base-300 text-base-content hover:bg-base-200 hover:border-base-300 rounded-xl">
                                                Contactar tienda
                                            </button>
                                            <button className="btn bg-jungle_teal hover:bg-teal-700 text-white border-none rounded-xl">
                                                Ver detalles <ArrowRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                /* --- ESTADO VACÍO RELATIVO (No hay pedidos en ESTA pestaña) --- */
                                <div className="flex flex-col items-center justify-center text-center p-10 bg-base-100/50 rounded-[3rem] border border-dashed border-base-300 mt-2">
                                    <div className="w-20 h-20 mb-4 text-base-content/20">
                                        <SearchX className="w-full h-full" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="font-bold text-xl text-base-content mb-2">Nada por aquí</h3>
                                    <p className="text-base-content/60 max-w-sm">
                                        No tienes ningún pedido con el estado <span className="font-bold text-jungle_teal">"{activeTab}"</span> actualmente.
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};