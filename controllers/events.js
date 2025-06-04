const { response } = require('express');
const bycript = require('bcryptjs');
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {

    const eventos = await Evento.find().populate('user', 'name');

    res.status(201).json({
        ok: 'true',
        msg: 'getEventos',
        eventos: eventos
    })
}


const crearEvento = async (req, res = response) => {

    //  console.log(req.body); //verificar si hay evento

    const evento = new Evento(req.body);

    try {

        evento.user = req.uid;
        const eventoGuardado = await evento.save();

        res.status(201).json({
            ok: 'true',
            msg: 'Evento Creado',
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }


}


const actualizarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid= req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Este evento no existe por ese ID'
            })
        }

        if (evento.user.toString() !==uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar este evento'
            })
        }
        const nuevoEvento = {
            ...req.body,
            user:uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId,nuevoEvento, {new:true});

        res.status(201).json({
            ok: 'true',
            msg: 'Evento Actualizado',
            id: eventoActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }

}

const eliminarEvento = async(req, res = response) => {
     const eventoId = req.params.id;
    const uid= req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Este evento no existe por ese ID'
            })
        }

        if (evento.user.toString() !==uid) {
             return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar este evento'
            })
        }

        await Evento.findByIdAndDelete(eventoId);

        res.status(201).json({
            ok: 'true',
            msg: 'Evento Eliminado',
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}