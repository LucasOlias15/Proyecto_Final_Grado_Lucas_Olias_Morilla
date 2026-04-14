import pool from "../db/db.js";

async function createComercio(nombre, idUsuario, descripcion, categoria, contacto, direccion, latitud, longitud, imagen) {
    try {
        const [result] = await pool.query(
            `INSERT INTO comercio (nombre, id_usuario, descripcion, categoria, contacto, direccion, latitud, longitud, imagen) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [nombre, idUsuario, descripcion, categoria, contacto, direccion, latitud, longitud, imagen] 
        );
        return result.insertId;
    } catch (error) {
        console.error('❌ Error SQL en createComercio:', error.message);
        throw error;
    }
}

async function getComercioById(idComercio) {
    try {
        // Si tu columna en HeidiSQL/Workbench se llama solo 'id', cambia id_comercio por id aquí
        const [rows] = await pool.query('SELECT * FROM comercio WHERE id_comercio = ?', [idComercio]);
        
        // Devolvemos rows[0] para que React reciba un OBJETO y no un Array
        return rows[0]; 
    } catch (error) {
        console.error('❌ Error SQL en getComercioById:', error.message);
        throw error;
    }
}

async function getAllComercios() {
    try {
        const [rows] = await pool.query('SELECT * FROM comercio');
        return rows;
    } catch (error) {
        console.error('❌ Error SQL en getAllComercios:', error.message);
        throw error;
    }
}

async function getComercioByUsuarioId(idUsuario) {
    try {
        const [rows] = await pool.query('SELECT * FROM comercio WHERE id_usuario = ?', [idUsuario]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error('❌ Error SQL en getComercioByUsuarioId:', error.message);
        throw error;
    }
}

async function updateComercioImage(nuevaImagen, idComercio){
    try {
        // Actualizamos la imagen buscando por id_comercio
        const [result] = await pool.query('UPDATE comercio SET imagen = ? WHERE id_comercio = ?', [nuevaImagen, idComercio]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('❌ Error SQL en updateComercioImage:', error.message);
        throw error;
    }
}

export { createComercio, getComercioById, getAllComercios, updateComercioImage, getComercioByUsuarioId };