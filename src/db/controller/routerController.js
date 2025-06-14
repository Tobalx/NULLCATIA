const { Router } = require('express');
const persons = require('../../routes/persons.routes.js'); // la ruta  de personas 

const rutas = Router();

rutas.use(""); //usar controlador

module.exports = rutas;