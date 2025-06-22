const express = require('express');
const {validarGatitos} = require('../middlewares/gatitos.validaciones');
const gatosController = require('../db/controller/gatitos.controller');
const clanesController = require('../db/controller/clanes.controller');
const router = express.Router(); 

router.get('/', async (req, res) => {
  try {
    const { nombre, clan_id } = req.query;

    let gatitos;
    if (nombre || clan_id) {
      gatitos = await gatosController.getByFilter({ nombre, clan_id });
    } else {
      gatitos = await gatosController.getAll();
    }
    
    const clanes = await clanesController.getAll();
    res.render('gatitos', { gatitos, clanes, filtros: req.query }); 
  } catch (error) {
    console.error('Error al obtener gatitos:', error);
    res.status(500).send('Hubo un error cargando los registros de gatitos.');
  }
});

router.get('/nuevo', async (req, res) => {
  const clanes = await clanesController.getAll();
  res.render('gatitos/crear', { clanes });
});

// router.post('/', validarGatitos, (req, res) => { // crear nuevo gatito
// res.send('crear un nuevo gatito :');
// });



router.post('/nuevo', async (req, res) => {
  try {
    const nuevoGato = {
      nombre: req.body.nombre,
      edad: req.body.edad || null,
      color: req.body.color || null,
      clan_id: req.body.clan_id || null,
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
    const clanes = await clanesController.getAll();
    res.render('gatitos/editar', { gato, clanes });
  } catch (err) {
    res.status(500).send("Error al cargar el templo de recasting.");
  }
});

router.post('/editar/:id', async (req, res) => {
  const id = req.params.id;
  const datos = {
    nombre: req.body.nombre,
    edad: req.body.edad || null,
    color: req.body.color,
    clan_id: req.body.clan_id
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