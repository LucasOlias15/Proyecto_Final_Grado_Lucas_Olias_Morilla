import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { registrarComercio } from "../controllers/comercioController.js"; // Importamos tu controlador

const router = Router();    
// Ruta para registrar un nuevo comercio
// POST /api/comercios/
router.post("/", authMiddleware, registrarComercio);

export default router;