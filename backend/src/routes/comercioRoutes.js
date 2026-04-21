import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { uploadImage } from "../middlewares/cloudinary.js";
import {
    registrarComercio,
    obtenerComercioPorId,
    obtenerTodosLosComercios,
    actualizarImagenComercio,
    actualizarComercio,
    obtenerMiComercio      
} from "../controllers/comercioController.js";

const router = Router();

// POST /api/comercios (protegido)
router.post("/", authMiddleware, registrarComercio);

// GET /api/comercios/mi-comercio (protegido)
router.get("/mi-comercio", authMiddleware, obtenerMiComercio);

// GET /api/comercios (público)
router.get("/", obtenerTodosLosComercios);

// GET /api/comercios/:id (público)
router.get("/:id", obtenerComercioPorId);

// PUT /api/comercios/:id (protegido)
router.put("/:id", authMiddleware, actualizarComercio);

// PUT /api/comercios/:id/imagen (protegido)
router.put("/:id/imagen", authMiddleware, uploadImage.single('imagen'), actualizarImagenComercio);

export default router;