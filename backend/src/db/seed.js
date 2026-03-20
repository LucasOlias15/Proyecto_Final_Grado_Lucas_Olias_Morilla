import pool from "./db.js";
import bcrypt from "bcrypt";

import { createUser } from "../models/userModel.js";
import { createComercio } from "../models/comercioModel.js";
import { createProducto } from "../models/productoModel.js";

async function seed() {
  try {
     console.log('Añadiendo productos base todo OK');

     // 1. LIMPIAR TABLAS (Desactivamos claves foráneas temporalmente para no dar error al borrar)
     await pool.query('SET FOREIGN_KEY_CHECKS = 0');
     await pool.query('TRUNCATE TABLE producto');
     await pool.query('TRUNCATE TABLE comercio');
     await pool.query('TRUNCATE TABLE usuario');
     await pool.query('SET FOREIGN_KEY_CHECKS = 1');
     console.log('Tablas limpiadas todo OK');

     // 2. CREAR USUARIOS (Todos tendrán la contraseña '123456')
     const claveHash = await bcrypt.hash('123456', 10);
     const idRegina = await createUser('Salvatore (Ortofrutta)', 'salvatore@regina.com', claveHash, 'Alcamo Centro');
     const idLucia = await createUser('Antonina (Panificio)', 'antonina@santalucia.com', claveHash, 'Alcamo Sud');
     const idNicolo = await createUser('Nicolò (Macelleria)', 'nicolo@renda.com', claveHash, 'Alcamo Nord');
     const idAlessandro = await createUser('Alessandro (Vivaio)', 'alessandro@perez.com', claveHash, 'Alcamo Est');
     console.log(' Usuarios creados OK.');

     // 3. CREAR COMERCIOS DE ALCAMO
     // Usamos tu función: createComercio(nombre, idUsuario, descripcion, categoria, contacto, direccion, latitud , longitud , imagen)
     const idComercio1 = await createComercio(
         'Ortofrutta Regina', idRegina, 
         'Frutta e verdura freschissima, km 0. I migliori prodotti della terra siciliana diretti alla tua tavola.', 
         'Frutería', '345 1653058', 'Via Monte Bonifato 28, Alcamo (TP)', '37.97542', '12.96531', 'https://res.cloudinary.com/defaik2fl/image/upload/v1774004564/tabrez-syed-WRaV7l_1JuA-unsplash_zyg1qj.jpg'
     );
     const idComercio2 = await createComercio(
         'Panificio S. Lucia', idLucia, 
         'Il vero pane artigianale alcamese, focacce, biscotti e specialità da forno tradizionali.', 
         'Panadería', '0924 28100', 'Via Maestro Angelo Marrocco 11, Alcamo (TP)' , '37.9768', '12.9618' , 'https://res.cloudinary.com/defaik2fl/image/upload/v1774004565/yeh-xintong-go3DT3PpIw4-unsplash_gutn66.jpg'
     );
     const idComercio3 = await createComercio(
         "Macelleria Renda Nicolò", idNicolo, 
         'Carni scelte, salumi artigianali e preparati di altissima qualità per i tuoi pranzi domenicali.', 
         'Carnicería', '0924 22006', 'Via Madonna Del Riposo 13, Alcamo (TP)', '37.9828', '12.9607', 'https://res.cloudinary.com/defaik2fl/image/upload/v1774004565/tommao-wang-kqytZ3VFb_o-unsplash_xq5pki.jpg'
     );
          const idComercio4 = await createComercio(
         "Vivaio naturale", idAlessandro, 
         'Piante di ogni tipo per la casa, alberi e cactus di ogni genere.', 
         'Bio', '0924 03942', 'Via Vittorio Veneto 269, Alcamo (TP)', '37.97787658797134', '12.96656156454616', 'https://res.cloudinary.com/defaik2fl/image/upload/v1774004567/timothy-hales-bennett-An0uaO4IhcQ-unsplash_kjtfdr.jpg'
     );
     console.log('Comercios de Alcamo registrados OK');

     // 4. CREAR PRODUCTOS (Con fotos placeholder de alta calidad)
     // createProducto(id_comercio, nombre, descripcion, stock, precio, imagen)
     
// --> Productos Frutería (Comercio 1)
     await createProducto(idComercio1, 'Arance di Ribera DOP', 'Arance dolci e succose, perfette per spremute mattutine.', 50, 2.50, 'https://res.cloudinary.com/defaik2fl/image/upload/v1774002711/1586_involtini_id1ikb.webp');
     await createProducto(idComercio1, 'Pomodori Siccagno', 'Pomodori coltivati all\'asciutto, sapore intenso e dolcissimo.', 30, 3.20, 'https://res.cloudinary.com/defaik2fl/image/upload/v1774002715/top-view-organic-colorful-tomatoes-isolated-wooden-kitchen-board-wooden-wall_dj97dh.jpg');
     await createProducto(idComercio1, 'Limoni di Siracusa IGP', 'Limoni freschi non trattati, ideali per sorbetti e condimenti.', 40, 1.80, 'https://res.cloudinary.com/defaik2fl/image/upload/v1774002713/fresh-yellow-organic-lemon-fruits-vintage-wood-table-background_djvoec.jpg');
     
     // --> Productos Panadería (Comercio 2)
     await createProducto(idComercio2, 'Pane Cunzato (Porzione)', 'Il classico pane cunzato con olio, pomodoro, acciughe e pecorino.', 20, 4.50, 'https://res.cloudinary.com/defaik2fl/image/upload/v1774002713/jude-infantini-rYOqbTcGp1c-unsplash_ghybft.jpg');
     await createProducto(idComercio2, 'Biscotti Fiori d\'Arancio', 'Biscotti artigianali profumati con arance biologiche siciliane.', 15, 6.00, 'https://res.cloudinary.com/defaik2fl/image/upload/v1774002713/eva-creative-lVf3t9JWS0E-unsplash_winb5z.jpg');
     await createProducto(idComercio2, 'Cannoli Siciliani (Kit)', 'Kit con scorze croccanti e sac-à-poche di ricotta fresca.', 10, 18.00, 'https://res.cloudinary.com/defaik2fl/image/upload/v1774002714/frankie-lopez-zZj6oQwhhTs-unsplash_gae3ge.jpg');
     
     // --> Productos Carnicería (Comercio 3)
     await createProducto(idComercio3, 'Salsiccia Pasqualora', 'Tipica salsiccia siciliana condita con sale, pepe e finocchietto.', 25, 12.00, 'https://res.cloudinary.com/defaik2fl/image/upload/v1774002718/danielle-suijkerbuijk-NWo2mDYnfjY-unsplash_voq7t0.jpg');
     await createProducto(idComercio3, 'Involtini alla Siciliana', 'Involtini di vitello ripieni di pangrattato, formaggio e pinoli.', 40, 15.50, 'https://res.cloudinary.com/defaik2fl/image/upload/v1774002711/donald-giannatti-sWZ85aMZXg4-unsplash_zleecb.jpg');
     await createProducto(idComercio3, 'Costine di Maiale Nero', 'Pregiata carne di maiale nero dei Nebrodi, sapore selvatico.', 15, 14.00, 'https://res.cloudinary.com/defaik2fl/image/upload/v1774002711/1586_involtini_id1ikb.webp');
     
     // --> Productos Vivero (Comercio 4)
     await createProducto(idComercio4, 'Pianta di Limone in Vaso', 'Albero di limone ornamentale, perfetto per balconi e terrazzi.', 10, 35.00, 'https://res.cloudinary.com/defaik2fl/image/upload/v1774002711/ildar-garifullin-uz0Q5euY4Ow-unsplash_vzwa1t.jpg');
     await createProducto(idComercio4, 'Gelsomino Siciliano', 'Pianta rampicante molto profumata con fiori bianchi a stella.', 20, 12.50, 'https://res.cloudinary.com/defaik2fl/image/upload/v1774002712/dl314-lin-50GT6tNMobs-unsplash_pbryu8.jpg');
     await createProducto(idComercio4, 'Set Erbe Aromatiche', 'Tris di vasi con timo, rosmarino e origano fresco.', 30, 9.00, 'https://res.cloudinary.com/defaik2fl/image/upload/v1774002711/samuel-toh-ICUH7gCnwr4-unsplash_nv6lmc.jpg');
     console.log('Productos añadidos al catálogo OK');

     console.log('Todo OK datos añadidos a las tablas');
     process.exit(0);

  } catch (error) {
     console.error('❌ Error sembrando la base de datos:', error);
     process.exit(1);
  }
}

// Ejecutamos la función
seed();