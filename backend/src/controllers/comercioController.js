import { createComercio } from "../models/comercioModel.js";

export const registrarComercio = async (req, res) => {
    try {
        const { nombre, descripcion, categoria, contacto, direccion } = req.body;
        const idUsuario = req.user.id; // Obtenemos el ID del usuario autenticado desde el token
        const comercioId = await createComercio(nombre, idUsuario, descripcion, categoria, contacto, direccion);
        return res.status(201).json({ 
            id: comercioId,
            message: "Comercio registrado exitosamente" });
    } catch (error) {
console.error("❌ Error real en el servidor:", error); 
    return res.status(500).json({ error: "Error al registrar el comercio" });
    }
};