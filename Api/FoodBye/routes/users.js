'use strict'

const express = require('express')
const router = express.Router()

const middleware = require('../middleware/index');
const UserController = require('../controllers/user')
const path = require('path');
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/login', UserController.login);
router.post('/register', upload.single('avatar'), UserController.register);
router.get('/users', middleware.ensureAuthenticatedAndAdmin, UserController.getUsuarios);
router.get('/users/unvalidated', middleware.ensureAuthenticatedAndAdmin, UserController.getUsuariosNoValidados);
router.get('/users/validated', middleware.ensureAuthenticatedAndAdmin, UserController.getUsuariosValidados);
router.get('/users/bikers', middleware.ensureAuthenticatedAndAdmin, UserController.getUsuariosBikers);
router.get('/avatar/:id', middleware.ensureAuthenticated, UserController.getAvatar);
router.get('/user/:id', middleware.ensureAuthenticated, UserController.getUsuario);
router.put('/user/:id', middleware.ensureAuthenticated ,UserController.editUser);
router.put('/users/:id', middleware.ensureAuthenticatedAndAdmin ,UserController.putValidarNoValidar);
router.delete('/users/:id', middleware.ensureAuthenticatedAndAdmin ,UserController.deleteUser);

module.exports = router