import { Router } from "express";
import { registrarUsuario,loginUsuario, obtenerPerfil } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = Router();

// Registrar nuevo usuario
router.post("/register", registrarUsuario);

router.get("/perfil", authMiddleware, obtenerPerfil);

// Login
router.post("/login", loginUsuario);

export default router;
