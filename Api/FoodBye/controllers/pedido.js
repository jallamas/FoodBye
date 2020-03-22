'use strict'

const error_types = require('./error_types');
const _ = require('lodash');
const Pedido = require('../models/pedido');
const getCompleteCode = require('../models/sequence');
const mongoose = require('mongoose');


let controller = {

    newPedido: (req, res, next) => {
        getCompleteCode('Pedido').then((code)=>{
            let pedido = new Pedido({
                numero_pedido: code,
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                origen: req.body.origen,
                destino: req.body.destino,
                asignacion: mongoose.Types.ObjectId(req.body.asignacion._id),
                client_phone: req.body.client_phone
            })


            pedido.save((err, pedido) => {
                let pedidoResponse={
                    id: pedido.id,
                    numero_pedido: pedido.numero_pedido,
                    titulo: pedido.titulo,
                    descripcion: pedido.descripcion,
                    origen: pedido.origen,
                    destino: pedido.destino,
                    client_phone: pedido.client_phone,
                    asignacion: pedido.asignacion,
                    realizado: pedido.realizado
                }
                if (err) next(new error_types.Error400(err.message));
                res.status(201).json({
                    pedidoResponse
                });
            });
        })
            
    },
    getTodosPedidos: (req, res, next)=>{
        Pedido.find((err, pedidos)=> {
        if (err) return console.error(err);
        res.status(200).json(pedidos);
        });
    },
    getPedidosSinAsignar: (req, res, next)=>{
        Pedido.find({asignacion:null},(err, pedidos)=> {
        if (err) return console.error(err);
        res.status(200).json(pedidos);
        });
    },
    getListaPedidosUsuario: (req, res, next)=>{
            Pedido.find({asignacion:mongoose.Types.ObjectId(req.params.id)},(err,pedidos)=>{
                if (err) return console.error(err);
                res.status(200).json(pedidos);
    });
},
    putAsignarPedido: (req,res,next)=>{
        Pedido.findByIdAndUpdate (mongoose.Types.ObjectId(req.params.id),{$set: {'asignacion': mongoose.Types.ObjectId(req.body.asignacion)}} ,{new: true}, (err, pedido) => {
            if (err) next(new error_types.Error500(err.message));
            else if (pedido == null) 
                next(new error_types.Error404("No se ha encontrado ningún pedido con ese ID"))
            else
                res.status(200).json(pedido);
        });
    },
}

const notFound = (res) => (entity) => {
    if (entity) {
      return entity
    }
    res.status(404).end()
    return null
  }

module.exports = controller;