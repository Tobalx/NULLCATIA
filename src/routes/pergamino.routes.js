const express = require('express');
const router = express.Router();
const {validarPergamino} = require('../middlewares/pergaminos.validaciones');



router.get('/', (req, res) =>{
    res.send('lista de pergaminos'); // listar pergaminos 
});

router.get('/nuevo', (req, res) => {
  res.send('formulario para nuevo pergamino :'); // crear formulario nuevo del pergamino
});

router.post('/', validarPergamino, (req, res) => { // crear un nuevo pergamino
    res.send('crear un nuevo pergamino');
})
module.exports = router;