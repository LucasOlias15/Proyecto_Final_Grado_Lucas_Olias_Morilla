import { createComercio, getComercioById, getAllComercios, updateComercioImage, getComercioByUsuarioId } from "../models/comercioModel.js";

export const registrarComercio = async (req, res) => {
    try {
        const { nombre, descripcion, categoria, contacto, direccion, latitud, longitud } = req.body;
        const idUsuario = req.user.id; 
        const comercioId = await createComercio(nombre, idUsuario, descripcion, categoria, contacto, direccion, latitud, longitud, null);
        return res.status(201).json({ 
            id: comercioId,
            message: "Comercio registrado exitosamente" 
        });
    } catch (error) {
        console.error(" Error en controlador registrarComercio:", error); 
        return res.status(500).json({ error: "Error al registrar el comercio" });
    }
};

export const obtenerComercioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const comercio = await getComercioById(id);
        
        if (!comercio) {
            return res.status(404).json({ error: "Comercio no encontrado" });
        }
        
        // Enviamos el objeto de la tienda (ahora con la foto correcta)
        return res.status(200).json(comercio);
    } catch (error) {
        console.error(" Error en controlador obtenerComercioPorId:", error); 
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const obtenerTodosLosComercios = async (req, res) => {
    try {
        const comercios = await getAllComercios();
        return res.status(200).json(comercios);
    } catch (error) {
        console.error(" Error en controlador obtenerTodosLosComercios:", error);
        return res.status(500).json({ error: "Error al obtener los comercios" });
    }
};

export const actualizarImagenComercio = async (req, res) => {
    try {
        if (!req.file){
            return res.status(400).json({ error: "No se ha introducido ninguna imagen" });
        }

        // Dependiendo de la librería la URL puede estar en uno de estos dos sitios
        const imagenSubida = req.file.path || req.file.secure_url;

        const success = await updateComercioImage(imagenSubida, req.params.id);

        if (!success) {
            return res.status(404).json({ error: "Comercio no encontrado para actualizar" });
        }   

        // Enviamos la URL correcta a React
        return res.status(200).json({ message: "Foto actualizada", imagenUrl: imagenSubida });

    } catch (error) {
        console.error(" Error en actualizarImagenComercio:", error);
        return res.status(500).json({ error: "Error al actualizar la imagen" });
    }
}