const express = require('express');
const router = express.Router(); 

router.get('/', (req, res) => {
  res.send('lista de gatitos :');
});

router.get('/nuevo', (req, res) => {
  res.send('formulario para un nuevo gatito :');
});

router.post('/', (req, res) => {
  res.send('crear un nuevo gatito :');
});

router.get('/:id/editar', (req, res) => {
  res.send(`editar gatito con id -> ${req.params.id}`);
});

router.put('/:id', (req, res) => {
  res.send(`actualizar gatito con id -> ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
  res.send(`eliminar gatito con id -> ${req.params.id}`);
});

module.exports = router;