const { Router } = require('express');
const {validarclan} = require('../middlewares/clanes.validaciones');
const router = Router();
const clanesController = require('../db/controller/clanes.controller');



router.get('/', async (req, res) => {
  try {
    const clanes = await clanesController.getAll();
    res.render('clanes/index', { clanes });
  } catch (err) {
    res.status(500).send("Error al convocar el consejo de clanes.");
  }
});


router.get('/crear', (req, res) => {
  res.render('clanes/crear');
});

router.post('/crear', async (req, res) => {
  try {
    await clanesController.create(req.body);
    res.redirect('/clanes');
  } catch (err) {
    res.status(500).send("Error al fundar el clan.");
  }
});


/*
router.post('/', validarclan, (req, res) => {
  res.send('crear clan en base de datos :'); // crear unnuevo clan
});
*/
module.exports = router;