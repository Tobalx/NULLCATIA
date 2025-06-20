const express = require('express');
const router = express.Router();
const {validarLectura} = require('../middlewares/lecturas.validaciones');
const lecturasController = require('../db/controller/lecturas.controller');

router.get('/', async (req,res) => {
  try {
    const lecturas = await lecturasController.getAll();
  } catch (error) {
    res.status(500).send('Error al cargar el Rastro de los Sabios');
  }
    res.render('lecturas/index', { lecturas });
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