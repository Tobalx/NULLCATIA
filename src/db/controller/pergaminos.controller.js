const conn = require('../connection.js');

const TABLA = "pergaminos";

// Obtener todos los pergaminos
function getAll() {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT 
            p.id AS pergamino_id,
            p.titulo,
            p.contenido,
            c.nombre AS clan
        FROM pergaminos p
        LEFT JOIN (
            SELECT l1.*
            FROM lecturas l1
            INNER JOIN (
                SELECT pergamino_id, MAX(fecha_lectura) AS max_fecha
                FROM lecturas
                GROUP BY pergamino_id
            ) l2
            ON l1.pergamino_id = l2.pergamino_id AND l1.fecha_lectura = l2.max_fecha
        ) l ON p.id = l.pergamino_id
        LEFT JOIN gatos g ON l.gato_id = g.id
        LEFT JOIN clanes c ON g.clan_id = c.id
        ORDER BY p.id;
        `, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

// Obtener un pergamino por su ID
function getOneBy(id) {
    return new Promise((resolve, reject) => {
        if (!id) return reject(new Error("ID no proporcionado"));

        conn.query(`SELECT * FROM ${TABLA} WHERE id = ?`, [id], (error, result) => {
            return error ? reject(error) : resolve(result[0]);
        });
    });
}

// Crear un nuevo pergamino
function create(pergamino) {
    return new Promise((resolve, reject) => {
        if (!pergamino || !pergamino.titulo || !pergamino.contenido) {
            return reject(new Error("Faltan campos obligatorios: titulo o contenido"));
        }

        conn.query(`INSERT INTO ${TABLA} SET ?`, pergamino, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

// Actualizar un pergamino existente
function update(id, pergamino) {
    return new Promise((resolve, reject) => {
        if (!id || !pergamino || Object.keys(pergamino).length === 0) {
            return reject(new Error("Faltan datos para actualizar"));
        }

        conn.query(`UPDATE ${TABLA} SET ? WHERE id = ?`, [pergamino, id], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

// Eliminar un pergamino por ID
function remove(id) {
    return new Promise((resolve, reject) => {
        if (!id) return reject(new Error("ID no proporcionado"));

        conn.query(`DELETE FROM ${TABLA} WHERE id = ?`, [id], (error, result) => {
            if (error) return reject(error);
            if (result.affectedRows === 0) {
                return reject(new Error("No se encontró el pergamino a eliminar"));
            }
            return resolve(result);
        });
    });
}

module.exports = { getAll, getOneBy, create, update, remove };