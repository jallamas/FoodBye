'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const asignacionSchema = new Schema({
    user_id: {
      type: Schema.ObjectId,
      ref: 'User'
      },
    fecha_asignacion: {
      type: Date,
      default: Date.now()
    }
});

module.exports = mongoose.model('Asignacion', asignacionSchema);

const pedidoSchema = Schema({
    numero_pedido: String,
    titulo: String,
    descripcion: String,
    origen: String,
    destino: String,
    realizado: {type: Boolean, default: false},
    created_date: { type: Date, default: Date.now },
    time_recogido: { type: Date },
    time_entregado: {type: Date },
    asignacion: asignacionSchema,
    client_phone: String,
    });

module.exports = mongoose.model('Pedido', pedidoSchema);