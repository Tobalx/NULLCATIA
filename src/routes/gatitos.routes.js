const express = require('express');
const {validargatito} = require('../middlewares/gatitos.validaciones');
const router = express.Router(); 

router.get('/', (req, res) => {
  res.send('lista de gatitos :'); // listar gatitos
});

router.get('/nuevo', (req, res) => {
  res.send('formulario para un nuevo gatito :'); // crear nuevo formulario para gatitos
});

router.post('/', validargatito, (req, res) => { // crear nuevo gatito
  res.send('crear un nuevo gatito :');
});

router.get('/:id/editar', (req, res) => { // editar gatito por id
  res.send(`editar gatito con id -> ${req.params.id}`);
});

router.put('/:id', (req, res) => { // actualizar gatito por id
  res.send(`actualizar gatito con id -> ${req.params.id}`);
});

router.delete('/:id', (req, res) => { // eliminar gatito por id
  res.send(`eliminar gatito con id -> ${req.params.id}`);
});

module.exports = router;