import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { uploadImage } from "../middlewares/cloudinary.js"; 
import { 
    registrarComercio, 
    obtenerComercioPorId, 
    obtenerTodosLosComercios,
    actualizarImagenComercio 
} from "../controllers/comercioController.js"; 

const router = Router();    

// Ruta protegida para registrar un nuevo comercio
// POST /api/comercios/
router.post("/", authMiddleware, registrarComercio);

// RUTA PÚBLICA: Obtener los datos de un comercio por su ID
// GET /api/comercios/:id
router.get("/:id", obtenerComercioPorId);

// RUTA PÚBLICA: Obtener todos los comercios
// GET /api/comercios/
router.get("/", obtenerTodosLosComercios);

// RUTA PROTEGIDA: Actualizar imagen de comercio 
// PUT /api/comercios/:id/imagen
router.put("/:id/imagen", authMiddleware, uploadImage.single('imagen'), actualizarImagenComercio);

export default router;