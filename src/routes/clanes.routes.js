const { Router } = require('express');
const {validarclan} = require('../middlewares/clanes.validaciones');
const router = Router();
const clanesController = require('../db/controller/clanes.controller');
const territorioController = require('../db/controller/territorios.controller');

router.get('/', async (req, res) => {
  try {
    const clanes = await clanesController.getAll();
    res.render('clanes/index', { clanes });
  } catch (err) {
    res.status(500).send("Error al convocar el consejo de clanes.");
  }
});


router.get('/crear', async (req, res) => {
  const territorios = await territorioController.getAll();
  res.render('clanes/crear', { territorios });
});

router.post('/crear', async (req, res) => {
  // try {
  console.log(req.body);
    await clanesController.create(req.body);
    res.redirect('/clanes');
  // } catch (err) {
  //   res.status(500).send("Error al fundar el clan.");
  // }
});


/*
router.post('/', validarclan, (req, res) => {
  res.send('crear clan en base de datos :'); // crear unnuevo clan
});
*/
module.exports = router;