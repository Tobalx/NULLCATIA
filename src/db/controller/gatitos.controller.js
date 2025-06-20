const conn = require('../connection.js');

const TABLA = "gatos";

// Obtener todos los gatos
function getAll() {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT gatos.*, clanes.nombre AS clan
            FROM gatos
            INNER JOIN clanes ON gatos.clan_id = clanes.id
        `;

        conn.query(query, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

// Obtener un gato por su ID
function getOneBy(id) {
    return new Promise((resolve, reject) => {
        if (!id) return reject(new Error("ID no proporcionado"));

        conn.query(`SELECT * FROM ${TABLA} WHERE id = ?`, [id], (error, result) => {
            return error ? reject(error) : resolve(result[0]);
        });
    });
}

// Crear un nuevo gato
function create(gato) {
    return new Promise((resolve, reject) => {
        if (!gato || !gato.nombre || !gato.color || !gato.clan_id) {
            return reject(new Error("Faltan campos obligatorios: nombre, color o clan_id"));
        }

        if (!gato.edad) {
            gato.edad = 0;
        }

        conn.query(`INSERT INTO ${TABLA} SET ?`, gato, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

// Actualizar un gato existente
function update(id, gato) {
    return new Promise((resolve, reject) => {
        if (!id || !gato || Object.keys(gato).length === 0 || !gato.nombre || !gato.color || !gato.clan_id) {
            return reject(new Error("Faltan datos para actualizar"));
        }

        if (!gato.edad) {
            gato.edad = 0;
        }

        conn.query(`UPDATE ${TABLA} SET ? WHERE id = ?`, [gato, id], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

// Eliminar un gato por ID
function remove(id) {
    return new Promise((resolve, reject) => {
        if (!id) return reject(new Error("ID no proporcionado"));

        conn.query(`DELETE FROM ${TABLA} WHERE id = ?`, [id], (error, result) => {
            if (error) return reject(error);
            if (result.affectedRows === 0) {
                return reject(new Error("No se encontró el gato a eliminar"));
            }
            return resolve(result);
        });
    });
}

// Obtener gatos por filtro
function getByFilter({ nombre, clan_id }) {
  return new Promise((resolve, reject) => {
    let query = `SELECT gatos.*, clanes.nombre AS clan FROM gatos
                 INNER JOIN clanes ON gatos.clan_id = clanes.id`;
    const conditions = [];
    const values = [];

    if (nombre) {
      conditions.push(`gatos.nombre LIKE ?`);
      values.push(`%${nombre}%`);
    }

    if (clan_id) {
      conditions.push(`gatos.clan_id = ?`);
      values.push(clan_id);
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(' AND ');
    }

    conn.query(query, values, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

module.exports = { getAll, getOneBy, create, update, remove, getByFilter };