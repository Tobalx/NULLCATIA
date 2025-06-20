const express = require('express');
const router = express.Router();
const {validarLectura} = require('../middlewares/lecturas.validaciones');
const lecturasController = require('../db/controller/lecturas.controller');

router.get('/', async (req, res) => {
  try {
    const lecturas = await lecturasController.getAll(); 
    res.render('lecturas/index', { lecturas }); 
  } catch (error) {
    console.error('Error al obtener lecturas:', error);
    res.status(500).send('Error al cargar el Rastro de los Sabios');
  }
});

router.get('/nueva', (req, res) => {
  res.render('lecturas/form'); 
});

router.post('/', validarLectura, async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
    try {
    await lecturasController.crear(req.body);
    res.redirect('/lecturas');
  } catch (err) {
    res.status(500).send('Error al registrar la lectura');
  }
});

// router.get('/', validarLectura, (req , res) => {
//     res.send('registrar nueva');
// });

module.exports = router;