const {body} = require('express-validator');

const validarclan = [ 
    body('nombre')
    .notEmpty().withMessage('colocar el nombre es obligatorio') // validacion para que el campo no este vacio
    .isLength({max:10}).withMessage('el nombre debe tener maximo 10 caracteres'), // validacion de nombre por caracteres maximos
    body('territorio_id')
    .notEmpty().withMessage('debes seleccionar un territorio') // validacion para que el campo no este vacio
    .isInt().withMessage('la id del territorio debe ser valida') // validacion de id correcta del territorio
];
module.exports = {validarclan};
