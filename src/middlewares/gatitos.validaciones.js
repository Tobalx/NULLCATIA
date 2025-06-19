const { body } = require('express-validator');

const validargatitos = [ 
    body('nombre')
    .notEmpty().withMessage('colocar el nombre es necesario') // validacion para que el campo no este vacio
    .isLength({ max: 20}).withMessage('el nombre debe tener maximo 20 caracteres'), // validacion de nombre por caracteres maximos
    body('edad') 
    .notEmpty().withMessage('colocar la edad es obligatorio') // validacion para que el campo no este vacio
    .isInt({min:0}).withMessage('la edad debe ser numero positivo, del 1 para arriba'),
    body('color')
    .notEmpty().withMessage('colocar el color es obligatorio') // validacion para que el campo no este vacio
    .isLength({max: 20}).withMessage('El color debe tener maximo 20 caracteres') // validar que el color tenga un minimo de caracteres
];
module.exports = {validargatitos};