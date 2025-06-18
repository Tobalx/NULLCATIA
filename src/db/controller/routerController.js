const { Router } = require('express');
const clanes = require('../../routes/clanes.routes.js'); // ruta de los clanes
const gatitos = require('../../routes/gatitos.routes.js') // ruta de gatitos
const rutas = Router();

rutas.use('/clanes', clanes); //usar controlador
rutas.use('/gatitos', gatitos);
module.exports = rutas;