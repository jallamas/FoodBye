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
                    time_recogido: pedido.time_recogido,
                    time_entregado: pedido.time_entregado,
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
    getListaPedidosUsuario: ({ params }, res, next)=>{
            Pedido.find({'asignacion._id': params.id},(err,pedidos)=>{
                if (err) return console.error(err);
                res.status(200).json(pedidos);
        });
    },
    getPedido: (req, res, next)=>{
        Pedido.findById(req.params.id,(err, pedido)=> {
        if (err) return console.error(err);
        res.status(200).json(pedido);
        });
    },
    putPedidoRecogido: function(req, res, next) {
        Pedido.findById(req.params.id, function(err, pedido) {
            if (err) return next(new error_types.Error404("El pedido con esta ID no existe"));
            if(pedido.time_recogido!=null){
                return next(new error_types.Error400("El pedido ya ha sido recogido"));
            }
            if(pedido.asignacion==null){
                return next(new error_types.Error404("El pedido no se ha asignado a nadie"));
            }
            else{
                    pedido.time_recogido=  Date.now()
                let pedidoResponse={
                    id: pedido.id,
                    numero_pedido: pedido.numero_pedido,
                    titulo:  pedido.titulo,
                    descripcion: pedido.descripcion,
                    origen: pedido.origen,
                    destino: pedido.destino,
                    realizado: pedido.realizado,
                    created_date: pedido.created_date,
                    time_recogido: pedido.time_recogido,
                    time_entregado: pedido.time_entregado,
                    asignacion: pedido.asignacion,
                    client_phone:pedido.client_phone
                }
                pedido.save(function(err) {
                    if(err) return res.status(500).send(err.message);
                res.status(200).jsonp(pedidoResponse);
                });
            }
        });
    },
    putPedidoEntregado: function(req, res, next) {
        Pedido.findById(req.params.id, function(err, pedido) {
            if (err) return next(new error_types.Error404("El pedido con esta ID no existe"));
            if(pedido.asignacion==null){
                return next(new error_types.Error404("El pedido no se ha asignado a nadie"));
            }
            if(pedido.time_recogido==null){
                return next(new error_types.Error404("El biker no ha recogido el pedido, por tanto no puede entregarlo"));
            }
            if(pedido.time_entregado!=null){
                return next(new error_types.Error400("El pedido ya se ha entregado"));
            }
            else if(pedido.time_recogido!=null){
                if(pedido.time_entregado==null){
                    pedido.time_entregado = Date.now()
                    let pedidoResponse={
                        id: pedido.id,
                        numero_pedido: pedido.numero_pedido,
                        titulo:  pedido.titulo,
                        descripcion: pedido.descripcion,
                        origen: pedido.origen,
                        destino: pedido.destino,
                        realizado: pedido.realizado,
                        created_date: pedido.created_date,
                        time_recogido: pedido.time_recogido,
                        time_entregado: pedido.time_entregado,
                        asignacion: pedido.asignacion,
                        client_phone:pedido.client_phone
                    }
                    pedido.save(function(err) {
                        if(err) return res.status(500).send(err.message);
                    res.status(200).jsonp(pedidoResponse);
                    });
                }
            }
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
    editPedido: function(req, res) {
        Pedido.findById(req.params.id, function(err, pedido) {
            pedido.numero_pedido = req.body.numero_pedido;
            pedido.titulo = req.body.titulo;
            pedido.descripcion = req.body.descripcion;
            pedido.origen = req.body.origen;
            pedido.destino = req.body.destino;
            pedido.client_phone = req.body.client_phone;
                        
            let pedidoResponse={
                id: pedido.id,
                numero_pedido: pedido.numero_pedido,
                titulo: pedido.titulo,
                descripcion: pedido.descripcion,
                origen: pedido.origen,
                destino: pedido.destino,
                client_phone: pedido.client_phone,
                time_recogido: pedido.time_recogido,
                time_entregado: pedido.time_entregado,
                asignacion: pedido.asignacion,
                realizado: pedido.realizado
            }
            pedido.save(function(err) {
                if(err) return res.status(500).send(err.message);
            res.status(200).jsonp(pedidoResponse);
            });
        });
    }
}

const notFound = (res) => (entity) => {
    if (entity) {
      return entity
    }
    res.status(404).end()
    return null
  }

module.exports = controller;