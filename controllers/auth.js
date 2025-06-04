const { response } = require('express');
const bycript = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;
    try {

        //Confirmar usuario
        let usuario = await Usuario.findOne({ email: email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Este usuario ya existe'
            })
        }

        usuario = new Usuario(req.body);
        //Encriptar password
        const salt = bycript.genSaltSync();
        usuario.password = bycript.hashSync(password, salt);
        await usuario.save();

        // Generar Token JWT

        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: 'true',
            uid: usuario.id,
            name: usuario.name,
            token: token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Porfavor hable con el administrador'
        })
    }



};

const loginusuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email: email });

        //Confirmar usuario
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Este usuario con este correo no existe'
            })
        }

        //Confirmar password

        const validPassword = bycript.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password Incorrecto'
            });
        }

        //Generar Token
        const token = await generarJWT(usuario.id, usuario.name);

        //Respuesta
        res.json({
            ok: 'true',
            msg: 'Loggeado',
            uid: usuario.id,
            name: usuario.name,
            token: token
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Porfavor hable con el administrador'
        })
    }


};



const revalidarToken = async (req, res = response) => {

    const {uid,name} = req;
  
    // Generar nuevo token
    const token = await generarJWT(uid, name);
    res.json({
        ok: 'true',
        msg: 'token renewed',
        uid: uid,
        name: name,
        token: token
    })

};

module.exports = {
    crearUsuario,
    loginusuario,
    revalidarToken
}