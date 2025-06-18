const { Router } = require('express');
const router = Router();


router.get('/', (req, res) => { // listar los clanes
  res.send('listado de clanes :');
});


router.get('/nuevo', (req, res) => {
  res.send('formulario para nuevo clan :'); // crear formulario nuevo del clan
});

router.post('/', (req, res) => {
  res.send('crear clan en base de datos :'); // crear unnuevo clan
});

module.exports = router;