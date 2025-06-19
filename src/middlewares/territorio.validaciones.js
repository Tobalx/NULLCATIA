const {body} = require('express-validator');
const validarterritorio = [
    body('nombre')
    .notEmpty().withMessage('el nombre del territorio es obligatorio') // validacion para que el campo no este vacio
    .isLength({max:30}).withMessage('debe contener maximo 30 caracteres') // validacion de nombre por caracteres maximos
];
module.exports = validarterritorio;