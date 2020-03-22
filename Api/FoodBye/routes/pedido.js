'use strict'

const express = require('express')
const router = express.Router()
const middleware = require('../middleware/index');
const PedidoController = require('../controllers/pedido')
const path = require('path');

router.post('/nuevo', middleware.ensureAuthenticatedAndAdmin, PedidoController.newPedido);

module.exports = router