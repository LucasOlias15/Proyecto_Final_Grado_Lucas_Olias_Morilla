
dotenv.config();
console.log("Host detectado:", process.env.DB_HOST);

import  pool from "./db/db.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Router } from "express";  
import userRoutes from "./routes/userRoutes.js";
import comercioRouter from "./routes/comercioRoutes.js";
import productRouter from "./routes/productRoutes.js";

const app = express();
app.use(cors()); //para que react no tenga problemas con el CORS al hacer peticiones a este backend
app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes como JSON
app.use('/api/productos', productRouter);

app.use('/api/comercios', comercioRouter); 

app.use('/api/users', userRoutes);

app.get("/", (req,res) => {
    // Respuesta generica para la ruta raíz
    res.send("Bienvenido a la API LocalMarkt");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
        // Verificar el servidor en el puerto indicado en el archivo .env
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});