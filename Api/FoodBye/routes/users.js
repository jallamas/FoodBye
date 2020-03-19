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
router.get('/avatar/:id', middleware.ensureAuthenticated, UserController.getAvatar);

module.exports = router