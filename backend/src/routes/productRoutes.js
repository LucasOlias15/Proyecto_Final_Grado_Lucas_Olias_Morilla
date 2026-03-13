import { Router } from "express";
import { 
    registrarProducto, 
    obtenerProductosPorComercio, 
    actualizarProducto, 
    obtenerProductoPorId ,
    eliminarProducto
} from "../controllers/productoController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

//Todas las rutas que tengan authMiddleware son para comprobar que el usuario que accede a ella tenga los "permisos" necesarios
// es decir, que esté autenticado. Esto se hace para evitar que cualquier persona pueda crear, modificar o eliminar productos sin estar logueada.
router.post("/", authMiddleware, registrarProducto);
router.get("/comercio/:id_comercio", obtenerProductosPorComercio);
router.put("/:id_producto", authMiddleware, actualizarProducto);
router.get("/:id_producto", obtenerProductoPorId);
router.delete("/:id_producto", authMiddleware, eliminarProducto);

export default router;