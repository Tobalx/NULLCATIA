const conn = require('../connection.js');

const TABLA = "lecturas";

// Obtener todas las lecturas
function getAll() {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM ${TABLA}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

// Obtener una lectura por clave compuesta (gato_id, pergamino_id)
function getOneBy(gato_id, pergamino_id) {
    return new Promise((resolve, reject) => {
        if (!gato_id || !pergamino_id) return reject(new Error("Faltan IDs para buscar lectura"));

        conn.query(
            `SELECT * FROM ${TABLA} WHERE gato_id = ? AND pergamino_id = ?`,
            [gato_id, pergamino_id],
            (error, result) => {
                if (error) return reject(error);
                return resolve(result[0] || null);
            }
        );
    });
}

// Crear una lectura (gato_id y pergamino_id obligatorios)
function create(lectura) {
    return new Promise((resolve, reject) => {
        if (!lectura || !lectura.gato_id || !lectura.pergamino_id) {
            return reject(new Error("Faltan campos obligatorios: gato_id o pergamino_id"));
        }

        // fecha_lectura es opcional, si no está se usará default CURRENT_DATE
        conn.query(`INSERT INTO ${TABLA} SET ?`, lectura, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

// Actualizar una lectura (en general puede ser solo fecha_lectura)
function update(gato_id, pergamino_id, lectura) {
    return new Promise((resolve, reject) => {
        if (!gato_id || !pergamino_id || !lectura || Object.keys(lectura).length === 0) {
            return reject(new Error("Faltan datos para actualizar lectura"));
        }

        conn.query(
            `UPDATE ${TABLA} SET ? WHERE gato_id = ? AND pergamino_id = ?`,
            [lectura, gato_id, pergamino_id],
            (error, result) => {
                return error ? reject(error) : resolve(result);
            }
        );
    });
}

// Eliminar una lectura por clave compuesta
function remove(gato_id, pergamino_id) {
    return new Promise((resolve, reject) => {
        if (!gato_id || !pergamino_id) {
            return reject(new Error("Faltan IDs para eliminar lectura"));
        }

        conn.query(
            `DELETE FROM ${TABLA} WHERE gato_id = ? AND pergamino_id = ?`,
            [gato_id, pergamino_id],
            (error, result) => {
                if (error) return reject(error);
                if (result.affectedRows === 0) {
                    return reject(new Error("No se encontró la lectura a eliminar"));
                }
                return resolve(result);
            }
        );
    });
}

module.exports = { getAll, getOneBy, create, update, remove };