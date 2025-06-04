/*
Events Routes
/api/events

*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { actualizarEvento, crearEvento, getEventos, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

//Todas los endpoints pasar por la validacion del JWT
router.use(validarJWT);

router.get('/', getEventos);

router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de Inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de Finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento);
router.put('/:id', actualizarEvento);
router.delete('/:id', eliminarEvento);

module.exports = router;