const express = require('express');
const router = express.Router();
const {validarterritorio} = require('../middlewares/pergaminos.validaciones');

router.get('/', (req, res) => {
  res.send('lista de territorios :'); // listar territorios
});

router.get('/nuevo', (req, res) => {
  res.send('formulario para nuevo territorio :'); // crear formulario nuevo del territorio
});

router.get('/nuevo', (req, res) => { // formulario para un nuevo territorio
    res.send('formulario para un nuevo territorio');
});

router.post('/',validarterritorio,(req,res) => { // crear un nuevo territorio
    res.send('crear un nuevo territorio');
});



module.exports = router;