const express = require('express');
const router = express.Router();
const {validarPergamino} = require('../middlewares/pergaminos.validaciones');
const pergaminosController = require('../db/controller/pergaminos.controller');



router.get('/', async (req, res) => {
  try {
    const pergaminos = await pergaminosController.getAll(); 
    res.render('pergaminos/index', { pergaminos });
  } catch (err) {
    res.status(500).send("Error al desenrollar los pergaminos.");
  }
});

router.get('/crear', (req, res) => {
  res.render('pergaminos/crear');
}); 

router.post('/crear', async (req, res) => {
  try {
    await pergaminosController.create(req.body);
    res.redirect('/pergaminos');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al escribir el pergamino.");
  }
});

/* 
router.post('/', validarPergamino, (req, res) => { // crear un nuevo pergamino
res.send('crear un nuevo pergamino');
})
*/
module.exports = router;