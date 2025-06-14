const express = require('express')
const routes = require('./routes/routes.js')
const morgan = require('morgan');


const app = express();
const port = 5000;

app.use(morgan('dev'));
app.use(routes);


app.listen(port, () => {
    console.log(`Servicio levandato: http://localhost:${port}`)
});