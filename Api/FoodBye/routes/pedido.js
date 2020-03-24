'use strict'

const express = require('express')
const router = express.Router()
const middleware = require('../middleware/index');
const PedidoController = require('../controllers/pedido')
const path = require('path');

router.post('/nuevo', middleware.ensureAuthenticatedAndAdmin, PedidoController.newPedido);
router.get('/todos', middleware.ensureAuthenticatedAndAdmin, PedidoController.getTodosPedidos);
router.get('/sinasignar', middleware.ensureAuthenticated, PedidoController.getPedidosSinAsignar);
router.get('/usuario/:id', middleware.ensureAuthenticated, PedidoController.getListaPedidosUsuario);
router.get('/:id', middleware.ensureAuthenticated, PedidoController.getPedido);
router.put('/asignar/:id', middleware.ensureAuthenticated, PedidoController.putAsignarPedido);
router.put('/recogido/:id', middleware.ensureAuthenticated, PedidoController.putPedidoRecogido);
router.put('/entregado/:id', middleware.ensureAuthenticated, PedidoController.putPedidoEntregado);

module.exports = router