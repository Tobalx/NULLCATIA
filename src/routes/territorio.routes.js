const express = require('express');
const router = express.Router();
const {validarterritorio} = require('../middlewares/pergaminos.validaciones');
const territoriosController = require('../db/controller/territorios.controller'); 

router.get('/', async (req, res) => {
  try {
    const territorios = await territoriosController.getAll();
    res.render('territorios/index', { territorios });
  } catch (err) {
    res.status(500).send('Error al cargar la geografía del reino.');
  }
});

router.get('/nuevo', (req, res) => {
  res.send('formulario para nuevo territorio :'); 
});

router.get('/nuevo', (req, res) => {
    res.send('formulario para un nuevo territorio');
});
/* 

router.post('/',validarterritorio,(req,res) => { // crear un nuevo territorio
res.send('crear un nuevo territorio');
});
*/



module.exports = router;