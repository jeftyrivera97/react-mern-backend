/*
    Auth Routes
    host + /api/auth

*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { crearUsuario, loginusuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


router.post(
    '/new',
    [ //middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario);

router.post(
    '/',
    [ //middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    loginusuario);

router.get('/renew',validarJWT, revalidarToken);

module.exports = router;