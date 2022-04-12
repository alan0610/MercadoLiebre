const path = require('path');
const { body } = require('express-validator');

// Validaciones
module.exports = [
    body('nombre_apellido')
    .notEmpty().withMessage('Ingrese su nombre por favor')
    .isLength({ min: 2}).withMessage('Debe tener al menos 2 letras'),
    body('email')
    .notEmpty().withMessage('Ingrese su email por favor').bail()
    .isEmail().withMessage('Ingrese un formato de correo válido'),
    body('contraseña')
    .notEmpty().withMessage('Ingrese una contraseña por favor')
    .isLength({ min: 8}).withMessage('Debe tener al menos 8 caracteres')
    .matches(/[a-z]/).withMessage('Debe tener al menor una letra minúscula.')
    .matches(/[A-Z]/).withMessage('Debe tener al menos una letra mayúscula.')
    .matches(/[0-9]/).withMessage('Debe tener al menos un número.')
    .matches(/[@$.!%#?&]/).withMessage('Debe tener al menos un caracter especial(@$.!%#?&).'),
    body('image').custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    if (!file) {
        image = 'default-image.png'
    } else {
        let fileExtension = path.extname (file.originalname);
        if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error (`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
        }
    }
    return true;
})
]