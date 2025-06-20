const express = require('express')
const routes = require('./routes/routes.js')
const morgan = require('morgan');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const port = 5000;

const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//configuraciones y layout
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');
app.use(express.static(__dirname + '/public'));

//bootstrap desde node_module
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

//rutas
app.use(routes);

//servidor
app.listen(port, () => {
    console.log(`Servicio levandato: http://localhost:${port}`)
});