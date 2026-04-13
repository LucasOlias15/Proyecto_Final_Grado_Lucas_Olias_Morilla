import { v2 as cloudinary } from 'cloudinary';
import { createRequire } from 'module';
const require = createRequire(import.meta.url); 

// 1. En esta versión, toda la librería ES la herramienta directamente
const cloudinaryStorage = require('multer-storage-cloudinary'); 

import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config(); // Para asegurarnos de que lee tu .env

// 1. Le damos nuestras credenciales a Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. ¡Fíjate aquí! Quitamos el "new" y sacamos las propiedades fuera de "params"
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'localmarkt_images', // Cloudinary creará esta carpeta automáticamente
  allowedFormats: ['jpg', 'png', 'jpeg', 'webp'], // Solo permitimos imágenes
  transformation: [{ width: 800, height: 800, crop: 'limit' }] // Comprime y limita el tamaño
});

// 3. Creamos el "middleware" que usaremos en nuestras rutas
export const uploadImage = multer({ storage: storage });