const  express  = require('express');
const ruta = express.Router(); 



ruta.get('/', (req, res) => {
  res.render('fundadores', { mainClass: 'founders' });
});




module.exports = ruta;