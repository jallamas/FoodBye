'use strict'

const error_types = require('./error_types');
const _ = require('lodash');
const Pedido = require('../models/pedido');
const getCompleteCode = require('../models/sequence');

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
                    asignacion: pedido.populate('asignacion').execPopulate(),
                    realizado: pedido.realizado
                }
                if (err) next(new error_types.Error400(err.message));
                res.status(201).json({
                    pedidoResponse
                });
            });
        })
            
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