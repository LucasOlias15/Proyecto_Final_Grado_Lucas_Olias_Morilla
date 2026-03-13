import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Si no se proporciona un token, respondemos con un error 401 (No autorizado)
    return res.status(401).json({ error: "Formato de token no válido o no proporcionado" });
}

    const token = authHeader.split(" ")[1]; // Obtenemos el token sin el prefijo "Bearer " spliteando la cadena por el " " 

    try {
        // Verificamos el token utilizando la clave secreta definida en el archivo .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Si el token es válido, guardamos la información decodificada en req.user para que esté disponible 
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Token inválido" });
    }

};