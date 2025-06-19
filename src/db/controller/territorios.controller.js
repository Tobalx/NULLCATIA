const conn = require('../connection.js');

const TABLA = "territorios";

// Obtener todos los territorios
function getAll() {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM ${TABLA}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

// Obtener un territorio por su ID
function getOneBy(id) {
    return new Promise((resolve, reject) => {
        if (!id) return reject(new Error("ID no proporcionado"));

        conn.query(`SELECT * FROM ${TABLA} WHERE id = ?`, [id], (error, result) => {
            return error ? reject(error) : resolve(result[0]);
        });
    });
}

// Crear un nuevo territorio
function create(territorio) {
    return new Promise((resolve, reject) => {
        if (!territorio || !territorio.nombre) {
            return reject(new Error("Falta el campo obligatorio: nombre"));
        }

        conn.query(`INSERT INTO ${TABLA} SET ?`, territorio, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

// Actualizar un territorio existente
function update(id, territorio) {
    return new Promise((resolve, reject) => {
        if (!id || !territorio || Object.keys(territorio).length === 0) {
            return reject(new Error("Faltan datos para actualizar"));
        }

        conn.query(`UPDATE ${TABLA} SET ? WHERE id = ?`, [territorio, id], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

// Eliminar un territorio por ID
function remove(id) {
    return new Promise((resolve, reject) => {
        if (!id) return reject(new Error("ID no proporcionado"));

        // Validar si hay clanes que lo estén usando
        conn.query(`SELECT COUNT(*) AS total FROM clanes WHERE territorio_id = ?`, [id], (err, result) => {
            if (err) return reject(err);

            const total = result[0].total;
            if (total > 0) {
                return reject(new Error("No se puede eliminar el territorio: está asociado a uno o más clanes."));
            }

            conn.query(`DELETE FROM ${TABLA} WHERE id = ?`, [id], (error, result) => {
                if (error) return reject(error);
                if (result.affectedRows === 0) {
                    return reject(new Error("No se encontró el territorio a eliminar"));
                }
                return resolve(result);
            });
        });
    });
}

module.exports = { getAll, getOneBy, create, update, remove };