const { Router } = require('express');
const ruta = Router();
const clanes = require('./clanes.routes')
const gatitos = require('./gatitos.routes')
const pergaminos = require('./pergamino.routes')
const territorio = require('./territorio.routes');


ruta.use('/clanes', clanes); //usar controlador
ruta.use('/gatitos', gatitos);
ruta.use('/pergaminos', pergaminos);
ruta.use('/territorio',territorio);


ruta.get('/', (req, res) => {
    res.render('index');
});

ruta.get('/alternativa', (req, res) => {
    res.send('ruta alternativa');
});

module.exports = ruta;