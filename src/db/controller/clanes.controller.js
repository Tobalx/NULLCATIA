const conn = require('../connection.js');

const TABLA = "clanes";

// Obtener todos los clanes
function getAll() {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM ${TABLA}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

// Obtener un clan por su ID
function getOneBy(id) {
    return new Promise((resolve, reject) => {
        if (!id) return reject(new Error("ID no proporcionado"));

        conn.query(`SELECT * FROM ${TABLA} WHERE id = ?`, [id], (error, result) => {
            return error ? reject(error) : resolve(result[0]);
        });
    });
}

// Crear un nuevo clan
function create(clan) {
    return new Promise((resolve, reject) => {
        if (!clan || !clan.nombre || !clan.territorio_id) {
            return reject(new Error("Faltan campos obligatorios: nombre o territorio_id"));
        }

        conn.query(`INSERT INTO ${TABLA} SET ?`, clan, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

// Actualizar un clan existente
function update(id, clan) {
    return new Promise((resolve, reject) => {
        if (!id || !clan || Object.keys(clan).length === 0) {
            return reject(new Error("Faltan datos para actualizar"));
        }

        conn.query(`UPDATE ${TABLA} SET ? WHERE id = ?`, [clan, id], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

// Eliminar un clan por ID
function remove(id) {
    return new Promise((resolve, reject) => {
        if (!id) return reject(new Error("ID no proporcionado"));

        // Verificar si hay gatos asociados antes de eliminar
        conn.query(`SELECT COUNT(*) AS total FROM gatos WHERE clan_id = ?`, [id], (err, result) => {
            if (err) return reject(err);

            const total = result[0].total;

            if (total > 0) {
                return reject(new Error("No se puede eliminar el clan: tiene gatos asociados."));
            }

            // Ahora sí se puede eliminar
            conn.query(`DELETE FROM ${TABLA} WHERE id = ?`, [id], (error, result) => {
                if (error) return reject(error);
                if (result.affectedRows === 0) {
                    return reject(new Error("No se encontró el clan a eliminar"));
                }
                return resolve(result);
            });
        });
    });
}

module.exports = { getAll, getOneBy, create, update, remove };