import pool from "../db/db.js";

async function createComercio(nombre, idUsuario, descripcion, categoria, contacto, direccion) {
    try {   
        const [result] = await pool.query(
            'INSERT INTO comercio (nombre, id_usuario, descripcion, categoria, contacto, direccion) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, idUsuario, descripcion, categoria, contacto, direccion]
        );
        return result.insertId; 
    } catch (error) {
        console.error('Error al crear el comercio:', error);
        throw error; 
    }
}

async function getComercioById(idComercio) {
    try {
        const [rows] = await pool.query('SELECT * FROM comercio WHERE id_comercio = ?', [idComercio]);
        return rows[0]; 
    } catch (error) {
        console.error('Error al obtener el comercio:', error);
        throw error;
    }
}

export { createComercio, getComercioById };