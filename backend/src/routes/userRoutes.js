import { Router } from "express";
import { uploadImage } from "../middlewares/cloudinary.js";
import { registrarUsuario, loginUsuario, obtenerPerfil, actualizarPerfil } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Ahora usamos 'uploadImage' que ya sabe mandar las cosas a Cloudinary
router.post("/registro", uploadImage.single("imagen"), registrarUsuario);

// ... el resto sigue igual

// Obtener perfil (Protegido)
router.get("/perfil", authMiddleware, obtenerPerfil);

// Login
router.post("/login", loginUsuario);

// Actualización de datos del usuario (¡AHORA PROTEGIDO TAMBIÉN!)
router.put("/perfil", authMiddleware, actualizarPerfil); 

export default router;