'use strict'

const express = require('express')
const router = express.Router()
const middleware = require('../middleware/index');
const PedidoController = require('../controllers/pedido')
const path = require('path');

router.post('/nuevo', middleware.ensureAuthenticatedAndAdmin, PedidoController.newPedido);
router.get('/todos', middleware.ensureAuthenticatedAndAdmin, PedidoController.getTodosPedidos);
router.get('/sin-asignar', middleware.ensureAuthenticatedAndAdmin, PedidoController.getPedidosSinAsignar);
router.get('/usuario/:id', middleware.ensureAuthenticatedAndAdmin, PedidoController.getListaPedidosUsuario);
router.put('/asignar/:id', middleware.ensureAuthenticatedAndAdmin, PedidoController.putAsignarPedido);

module.exports = router