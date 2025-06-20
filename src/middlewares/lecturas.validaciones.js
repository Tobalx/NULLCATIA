const {body} = require('express-validator');
const validarLectura = [
    body('gato_id')
    .notEmpty().withMessage('debes seleccionar un gato')
    .isInt().withMessage('la id del gato debe ser SI O SI un numerooo'),
    body('pergamino_id')
    .notEmpty().withMessage('deber seleccionar un pergamino')
    .isInt().withMessage('el id del pergamino tiene que ser un numero'),
    body('fecha_lectura')
    .notEmpty().withMessage('la fecha de la lectura es obligatoria')
    .isISO8601().withMessage('debe ser una fecha valida')
];
module.exports = {validarLectura};