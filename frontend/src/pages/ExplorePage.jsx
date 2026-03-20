import { useState, useEffect } from "react"; // 👈 Añadido useEffect
import { motion } from "framer-motion";
import { PanelTopOpen, Search, ShoppingBasket, Store } from "lucide-react";

export const ExplorePage = () => {
    // 1. Estados de Datos
    const [shops, setShops] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Estados de Filtros (¡ESTO FALTABA!)
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todas");
    const [viewMode, setViewMode] = useState("tiendas");

    const categorias = ["Todas", "Frutería", "Panadería", "Carnicería", "Bio"];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [resShops, resProducts] = await Promise.all([
                    fetch("http://localhost:3000/api/comercios"),
                    fetch("http://localhost:3000/api/productos/explorar")
                ]);

                if (!resShops.ok || !resProducts.ok) throw new Error("Error en el servidor");

                const dataShops = await resShops.json();
                const dataProducts = await resProducts.json();

                setShops(dataShops);
                setProducts(dataProducts);
            } catch (err) {
                console.error("❌ Error:", err);
                setError("Error al conectar con el mercado.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // --- LÓGICA DE FILTRADO ---
    const filteredShops = shops.filter((shop) => {
        const matchCategoria = selectedCategory === "Todas" || shop.categoria === selectedCategory;
        const matchBusqueda = shop.nombre.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategoria && matchBusqueda;
    });

    const filteredProducts = products.filter((product) => {
        const matchCategoria = selectedCategory === "Todas" || product.categoria === selectedCategory;
        const matchBusqueda = product.nombre.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategoria && matchBusqueda;
    });

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <span className="loading loading-dots loading-lg text-jungle_teal"></span>
        </div>
    );

    return (
        <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto px-4 py-8 w-full">
            {/* BARRA LATERAL */}
            <aside className="w-full md:w-64 shrink-0">
                <h2 className="font-bold text-xl mb-4 text-base-content">Categorías</h2>
                <div className="flex flex-col gap-2">
                    {categorias.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`text-left px-4 py-2 rounded-xl transition-all font-medium border ${
                                selectedCategory === cat ? "btn-categoria-activo shadow-sm" : "border-transparent hover:bg-base-200 text-base-content/70"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </aside>

            <main className="flex-1">
                <header className="mb-10">
                    {/* BUSCADOR */}
                    <div className="relative group w-full mb-8">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-jungle_teal to-sea_green rounded-full blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                        <div className="relative flex items-center bg-base-100 rounded-full shadow-sm border border-base-300 overflow-hidden">
                            <div className="pl-5 text-base-content/40"><Search size={20} /></div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="¿Qué buscas hoy?"
                                className="w-full bg-transparent py-3 px-4 outline-none"
                            />
                        </div>
                    </div>

                    {/* TABS */}
                    <div className="flex gap-6 border-b border-base-200">
                        <button onClick={() => setViewMode("tiendas")} className={`pb-3 px-2 font-bold border-b-2 flex items-center gap-2 ${viewMode === "tiendas" ? "border-jungle_teal text-jungle_teal" : "border-transparent opacity-50"}`}>
                            <Store size={18} /> Tiendas
                        </button>
                        <button onClick={() => setViewMode("productos")} className={`pb-3 px-2 font-bold border-b-2 flex items-center gap-2 ${viewMode === "productos" ? "border-jungle_teal text-jungle_teal" : "border-transparent opacity-50"}`}>
                            <ShoppingBasket size={18} /> Productos
                        </button>
                        <button onClick={() => setViewMode("todos")} className={`pb-3 px-2 font-bold border-b-2 flex items-center gap-2 ${viewMode === "todos" ? "border-jungle_teal text-jungle_teal" : "border-transparent opacity-50"}`}>
                            <PanelTopOpen size={18} /> Tod@s
                        </button>
                    </div>
                </header>

                <section>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Render COMERCIOS */}
                        {(viewMode === "tiendas" || viewMode === "todos") && filteredShops.map((shop) => (
                            <div key={`shop-${shop.id_comercio}`} className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-all">
                                <figure className="h-32 bg-jungle_teal/10 text-4xl flex items-center justify-center">🏪</figure>
                                <div className="card-body p-4">
                                    <h2 className="card-title text-base">{shop.nombre}</h2>
                                    <p className="text-xs opacity-60">{shop.categoria}</p>
                                    <p className="text-xs italic">{shop.direccion}</p>
                                </div>
                            </div>
                        ))}

                        {/* Render PRODUCTOS */}
                        {(viewMode === "productos" || viewMode === "todos") && filteredProducts.map((product) => (
                            <div key={`prod-${product.id_producto}`} className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-all">
                                <figure className="h-32 bg-base-200 overflow-hidden">
                                    <img src={product.imagen} alt={product.nombre} className="w-full h-full object-cover" />
                                </figure>
                                <div className="card-body p-4">
                                    <h2 className="card-title text-base">{product.nombre}</h2>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="font-bold text-jungle_teal">{product.precio}€</span>
                                        <button className="btn btn-xs btn-primary">Añadir</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};