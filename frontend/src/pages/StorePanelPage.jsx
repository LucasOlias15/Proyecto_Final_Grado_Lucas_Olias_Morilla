import { MapPinCheckInside } from "lucide-react";
import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";

// 🌟 Definimos la URL de la API de forma dinámica (Vite)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const StorePanelPage = () => {
    // 💡 1. RUTAS Y ESTADOS
    const [, params] = useRoute("/panel-tienda/:id");
    const storeId = params.id;

    const [store, setStore] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [imageFile, setImageFile] = useState(null);
    const [toast, setToast] = useState(null);

    const mostrarNotificacion = (mensaje, tipo = "success") => {
        setToast({ mensaje, tipo });
        setTimeout(() => {
            setToast(null);
        }, 3000);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        nombre: "", descripcion: "", precio: "", stock: "", imagen: ""
    });
    const [editingId, setEditingId] = useState(null);

    const [productToDelete, setProductToDelete] = useState(null);

    // 💡 2. CARGA INICIAL DE DATOS
    useEffect(() => {
        const fetchStoreData = async () => {
            try {
                // Usamos la variable de entorno
                const resStore = await fetch(`${API_URL}/comercios/${storeId}`);
                const storeData = await resStore.json();
                setStore(storeData);

                const resProducts = await fetch(`${API_URL}/productos/comercio/${storeId}`);
                const productsData = await resProducts.json();
                setProducts(productsData);
            } catch (error) {
                console.error("Error cargando el panel:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStoreData();
    }, [storeId]);

    // 💡 3. FUNCIÓN ELIMINAR (Confirmada desde el modal)
    const confirmDelete = async () => {
        if (!productToDelete) return;
        const productId = productToDelete.id_producto;

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/productos/${productId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (res.ok) {
                setProducts(products.filter(p => p.id_producto !== productId));
                mostrarNotificacion("Producto eliminado correctamente", "success");
            } else {
                mostrarNotificacion("Error al eliminar el producto", "error");
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            mostrarNotificacion("Error de conexión al intentar eliminar", "error");
        } finally {
            setProductToDelete(null); // Cerramos el modal de borrado
        }
    };

    // 💡 4. ABRIR MODALES
    const handleOpenAdd = () => {
        setEditingId(null);
        setNewProduct({ nombre: "", descripcion: "", precio: "", stock: "", imagen: "" });
        setImageFile(null); // Limpiamos el archivo residual si lo hubiera
        setIsModalOpen(true);
    };

    const handleOpenEdit = (product) => {
        setEditingId(product.id_producto);
        setNewProduct({
            nombre: product.nombre,
            descripcion: product.descripcion,
            precio: product.precio,
            stock: product.stock,
            imagen: product.imagen
        });
        setImageFile(null); // Reseteamos la imagen nueva a subir
        setIsModalOpen(true);
    };

    // 💡 5. FUNCIÓN GUARDAR INTELIGENTE
    const handleSaveProduct = async (e) => {
        e.preventDefault();

        if (!newProduct.nombre || !newProduct.precio) {
            mostrarNotificacion("Por favor, rellena los campos obligatorios.", "error");
            return;
        }

        const formData = new FormData();
        formData.append("nombre", newProduct.nombre);
        formData.append("precio", newProduct.precio);
        formData.append("descripcion", newProduct.descripcion);
        formData.append("stock", newProduct.stock);
        formData.append("id_comercio", storeId);

        if (imageFile) {
            formData.append("imagen", imageFile);
        } else if (!editingId) {
            mostrarNotificacion("Por favor, selecciona una imagen para el producto.", "error");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const method = editingId ? "PUT" : "POST";
            const url = editingId
                ? `${API_URL}/productos/actualizar/${editingId}`
                : `${API_URL}/productos/registrar`;

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                if (editingId) {
                    setProducts(products.map(p => p.id_producto === editingId ? {
                        ...p,
                        nombre: newProduct.nombre,
                        precio: newProduct.precio,
                        descripcion: newProduct.descripcion,
                        stock: newProduct.stock,
                        imagen: data.imagen || p.imagen
                    } : p));
                } else {
                    const nuevoProductoFisico = {
                        id_producto: data.id,
                        nombre: newProduct.nombre,
                        precio: newProduct.precio,
                        descripcion: newProduct.descripcion,
                        stock: newProduct.stock,
                        imagen: data.imagen,
                        id_comercio: storeId
                    };
                    setProducts([nuevoProductoFisico, ...products]);
                }

                setNewProduct({ nombre: "", precio: "", descripcion: "", stock: "", imagen: "" });
                setImageFile(null);
                setEditingId(null);
                setIsModalOpen(false);
                mostrarNotificacion(`Producto ${editingId ? 'actualizado' : 'añadido'} correctamente`, "success");

            } else {
                mostrarNotificacion(data.error || "Error al procesar el producto", "error");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            mostrarNotificacion("Error de conexión al guardar el producto.", "error");
        }
    };

    // 💡 6. SEGURIDAD
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.rol !== 'dueño' || String(user.id_comercio) !== String(storeId)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-error mb-4">Acceso Denegado 🛑</h1>
                    <p>No tienes permiso para gestionar esta tienda.</p>
                    <Link href="/" className="btn mt-6">Volver al inicio</Link>
                </div>
            </div>
        );
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-base-200"><span className="loading loading-spinner loading-lg text-jungle_teal"></span></div>;

    // 💡 7. LA INTERFAZ VISUAL
    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8 relative">
            <div className="max-w-6xl mx-auto">

                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-base-content">Panel de <span className="text-jungle_teal">Gestión</span></h1>
                        <p className="text-base-content/60 font-medium">Estás editando: <span className="font-bold">{store?.nombre}</span></p>
                    </div>
                    <button className="btn bg-jungle_teal text-white border-none rounded-2xl hover:bg-teal-700" onClick={handleOpenAdd}>
                        + Añadir Producto
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="bg-base-100 p-6 rounded-4xl shadow-xl border border-base-content/10 h-fit">
                        <img src={store?.imagen} className="w-full h-40 object-cover rounded-2xl mb-4" alt="Tienda" />
                        <h2 className="text-xl font-bold mb-2 text-base-content">{store?.nombre}</h2>
                        <span className="badge badge-outline border-jungle_teal text-jungle_teal font-bold mb-4">{store?.categoria}</span>
                        <p className="flex items-center gap-2 text-sm opacity-70 text-base-content mt-1">
                            <MapPinCheckInside size={16} className="shrink-0" />
                            {store?.direccion}
                        </p>                    </div>

                    <div className="lg:col-span-2 bg-base-100 p-6 rounded-4xl shadow-xl border border-base-content/10">
                        <h2 className="text-2xl font-black mb-6 text-base-content">Tus Productos</h2>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr className="border-b border-base-200 text-base-content/50 uppercase text-xs">
                                        <th>Producto</th>
                                        <th>Precio</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id_producto} className="hover:bg-base-200/50 transition-colors border-b border-base-200/50">
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={product.imagen} alt={product.nombre} className="object-cover" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-base-content">{product.nombre}</div>
                                                        <div className="text-sm opacity-50 text-base-content">{product.descripcion?.substring(0, 30)}...</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="font-bold text-jungle_teal">{Number(product.precio).toFixed(2)}€</td>
                                            <td>
                                                <button className="btn btn-ghost btn-xs text-info mr-2" onClick={() => handleOpenEdit(product)}>Editar</button>
                                                <button className="btn btn-ghost btn-xs text-error" onClick={() => setProductToDelete(product)}>Eliminar</button></td>
                                        </tr>
                                    ))}
                                    {products.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="text-center py-8 text-base-content/50">
                                                No tienes productos todavía. ¡Añade el primero!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* 💡 8. EL MODAL FLOTANTE */}
                {isModalOpen && (
                    <div className="modal modal-open bg-black/60 backdrop-blur-sm transition-all z-60">
                        <div className="modal-box rounded-4xl shadow-2xl bg-base-100">
                            <h3 className="font-black text-2xl mb-6 text-jungle_teal">
                                {editingId ? "Editar Producto" : "Añadir Nuevo Producto"}
                            </h3>

                            {/*TODO Estilo del formulario acorde a la página*/}

                            <form onSubmit={handleSaveProduct} className="flex flex-col gap-4">
                                <input type="text" placeholder="Nombre del producto" required className="input input-bordered w-full bg-base-200 focus:bg-base-100 transition-colors"
                                    value={newProduct.nombre} onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
                                />
                                <input type="number" placeholder="Precio" required className="input input-bordered w-full bg-base-200 focus:bg-base-100 transition-colors" step="0.01"
                                    value={newProduct.precio} onChange={(e) => setNewProduct({ ...newProduct, precio: e.target.value })}
                                />
                                <textarea placeholder="Descripción" required className="textarea textarea-bordered w-full bg-base-200 focus:bg-base-100 transition-colors h-24"
                                    value={newProduct.descripcion} onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })}
                                />
                                <input type="number" placeholder="Stock" required className="input input-bordered w-full bg-base-200 focus:bg-base-100 transition-colors"
                                    value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                />

                                {/* 👇 ATENCIÓN AL REQUIRED 👇 */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    required={!editingId}
                                    className="file-input file-input-bordered w-full file-input-success bg-base-200"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                />
                                {editingId && <span className="text-xs opacity-50 ml-1">Deja esto en blanco si no quieres cambiar la imagen actual.</span>}

                                <div className="modal-action mt-6">
                                    <button type="button" className="btn btn-ghost hover:bg-base-200" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                                    <button type="submit" className="btn bg-jungle_teal text-white border-none hover:bg-teal-700">Guardar Producto</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            {/* 🍞 TOAST CON Z-INDEX CORRECTO 🍞 */}
            {toast && (
                <div className="toast toast-top toast-center z-100 animate-fade-in-down mt-16 md:mt-4">
                    <div className={`alert shadow-2xl text-white font-bold rounded-2xl ${toast.tipo === 'error' ? 'alert-error' : 'bg-jungle_teal border-none'}`}>
                        {toast.tipo === 'error' ? <span>❌</span> : <span>✅</span>}
                        <span>{toast.mensaje}</span>
                    </div>
                </div>
            )}

            {/* 🚨 MODAL DE CONFIRMACIÓN DE BORRADO 🚨 */}
            {productToDelete && (
                <div className="modal modal-open bg-black/60 backdrop-blur-sm transition-all z-70">
                    <div className="modal-box rounded-4xl shadow-2xl bg-base-100 max-w-sm text-center">
                        <div className="flex justify-center mb-4 text-error">
                            {/* Icono de advertencia */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="font-black text-2xl mb-2 text-base-content">¿Estás seguro?</h3>
                        <p className="text-base-content/70 mb-6">
                            Vas a eliminar el producto <span className="font-bold text-base-content">"{productToDelete.nombre}"</span>. Esta acción no se puede deshacer.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button className="btn btn-ghost hover:bg-base-200" onClick={() => setProductToDelete(null)}>
                                Cancelar
                            </button>
                            <button className="btn bg-error text-white border-none hover:bg-red-700" onClick={confirmDelete}>
                                Sí, eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};