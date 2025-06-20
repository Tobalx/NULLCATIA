const express = require('express');
const {validargatito} = require('../middlewares/gatitos.validaciones');
const gatosController = require('../db/controller/gatitos.controller');
const router = express.Router(); 

router.get('/', async (req, res) => {
  try {
    const gatitos = await gatosController.getAll();
    res.render('gatitos', { gatitos }); // Renderiza la vista con los datos
  } catch (error) {
    console.error('Error al obtener gatitos:', error);
    res.status(500).send('Hubo un error cargando los registros de gatitos.');
  }
});

router.get('/nuevo', (req, res) => {
  res.render('gatitos/crear');
});
/* 
router.post('/', validargatito, (req, res) => { // crear nuevo gatito
res.send('crear un nuevo gatito :');
});
*/


router.post('/nuevo', async (req, res) => {
  try {
    const nuevoGato = {
      nombre: req.body.nombre,
      edad: req.body.edad || null,
      clan: req.body.clan || null,
    };
    await gatosController.create(nuevoGato);
    res.redirect('/gatitos');
  } catch (error) {
    res.status(500).send('Error invocando nuevo gatito.');
  }
});

router.get('/editar/:id', async (req, res) => {
  try {
    const gato = await gatosController.getOneBy(req.params.id);
    if (!gato) return res.status(404).send("Gato no encontrado");
    res.render('gatitos/editar', { gato });
  } catch (err) {
    res.status(500).send("Error al cargar el templo de recasting.");
  }
});

router.post('/editar/:id', async (req, res) => {
  const id = req.params.id;
  const datos = {
    nombre: req.body.nombre,
    edad: req.body.edad,
    clan: req.body.clan
  };

  try {
    await gatosController.update(id, datos);
    res.redirect('/gatitos');
  } catch (error) {
    res.status(500).send("Mutación fallida: no se pudo reescribir el destino del gatito.");
  }
});

router.delete('/:id', (req, res) => { // eliminar gatito por id
  res.send(`eliminar gatito con id -> ${req.params.id}`);
});

module.exports = router;