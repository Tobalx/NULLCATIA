const {body} = require('express-validator');
const validarPergamino = [
    body('titulo')
    .notEmpty().withMessage('el titulo es obligatorio') // validacion para que el campo no este vacio
    .isLength({max:50}).withMessage('tiene que tener maximo 50 caracteres'), // validacion de titulo por caracteres maximos
    body('contenido')
    .notEmpty().withMessage('el contenido es obligatorio'), // validacion para que el campo no este vacio
    body('fecha_creacion')
    .notEmpty().withMessage('la fecha es obligatoria') // validacion para que el campo no este vacio
    .isISO8601().withMessage('la fecha debe ser valida') // validacion para que la fecha sea mayor a la actual 
    .custom((value) => {
        const fecha = new Date(value);  // en la validacion se borra las horas por no ser necesarias
        const fechahoy = new Date();
        fecha.setHours(0,0,0,0);
        fechahoy.setHours(0,0,0,0);
        if (fecha <= fechahoy) {  // en la validacion usamos el if para comparar la fecha actual con la fecha que se coloca para que esta sea SI O SI mayor a la actual
            throw new Error('la fecha que ingrese debe ser mayor a la actual')
        }
        return true;
    })
];
module.exports = validarPergamino;