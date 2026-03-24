Stack Tecnológico y Arquitectura
1. Frontend (Interfaz de Usuario)
La aplicación cliente está construida como una SPA (Single Page Application) moderna, priorizando el rendimiento y las animaciones fluidas.

Core y Entorno:

React: Librería principal para la construcción de interfaces de usuario basadas en componentes.

Vite: Herramienta de construcción (Bundler) ultrarrápida que reemplaza a Create React App, optimizando el tiempo de desarrollo y el peso final del proyecto.

Enrutamiento y Estado:

Wouter: Enrutador minimalista para React. Se utiliza por su bajo peso y simplicidad para manejar las rutas (ej. /tienda/:id) frente a alternativas más pesadas.

Zustand: Gestor de estado global pequeño, rápido y escalable. Perfecto para manejar estados compartidos sin la complejidad del boilerplate tradicional.

Estilos y Diseño (UI/UX):

TailwindCSS: Framework de CSS basado en utilidades que permite construir diseños a medida rápidamente sin salir del HTML/JSX.

DaisyUI: Biblioteca de componentes de interfaz de usuario conectada como plugin a TailwindCSS. Aporta clases semánticas (ej. btn, card) y temas de color (light/dark mode).

Framer-Motion: Librería de animaciones de grado de producción para React. Utilizada para transiciones suaves de componentes (fade-ins, deslizamientos en listas y tarjetas).

Lucide-React: Paquete de iconos SVG limpios, consistentes y altamente personalizables.

Mapas y Geolocalización:

Leaflet: Librería JavaScript open-source para mapas interactivos mobile-friendly (integrada para la visualización de comercios/direcciones).

2. Backend (Servidor y API)
El servidor está desarrollado con una arquitectura RESTful para separar claramente la lógica de negocio de la interfaz.

Entorno de Ejecución y Framework:

Node.js: Entorno de ejecución de JavaScript del lado del servidor.

Express.js: Framework minimalista y flexible para Node.js, utilizado para estructurar las rutas, controladores y middlewares de la API (/api/comercios, /api/favoritos, etc.).

Lógica y Middlewares:

CORS (Cross-Origin Resource Sharing): Middleware habilitado para permitir que el Frontend (en un puerto diferente) pueda hacer peticiones al Backend de forma segura.

Dotenv: Módulo que carga variables de entorno desde un archivo .env a process.env, manteniendo seguras las credenciales de la base de datos y otras claves.

3. Base de Datos y Servicios Cloud (Infraestructura)
El proyecto se apoya en servicios en la nube para garantizar la persistencia de datos y el almacenamiento de recursos estáticos.

Base de Datos:

MySQL: Sistema de gestión de bases de datos relacional (RDBMS). Utilizado para estructurar de forma robusta los usuarios, comercios, productos y relaciones (ej. favoritos).

mysql2 (Paquete npm): Driver de conexión para Node.js que permite interactuar con la base de datos mediante Connection Pools (pool.query) y promesas nativas (async/await).

Servicios en la Nube (BaaS / PaaS):

Clever Cloud: Plataforma de alojamiento en la nube (PaaS) utilizada para hostear la base de datos MySQL de forma remota, permitiendo acceso persistente desde cualquier entorno.

Cloudinary: Servicio en la nube para la gestión y entrega de imágenes. Utilizado para almacenar las fotografías de los productos y los comercios, optimizando su carga en el frontend y aligerando la base de datos.

4. Herramientas de Desarrollo y Navegador
Nodemon: Utilidad de desarrollo que monitorea los cambios en los archivos del backend y reinicia automáticamente el servidor de Node.js, agilizando el flujo de trabajo.

LocalStorage (Web API): Almacenamiento local del navegador, utilizado de forma nativa para persistir la sesión del usuario (usuario.id, nombre, token) y mantener el estado de autenticación tras recargar la página.