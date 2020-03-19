'use strict'

const express = require('express')
const router = express.Router()

const middleware = require('../middleware/index');
const UserController = require('../controllers/user')
const path = require('path');
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

/* let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'avatars/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Se adjunta la extensión del fichero original
    }
  })
  
let upload = multer({ storage: storage,
  limits:{fileSize:10000000}
}); */


router.post('/login', UserController.login);
router.post('/register', upload.single('avatar'), UserController.register);
router.get('/users', middleware.ensureAuthenticatedAndAdmin, UserController.getUsuarios);
router.get('/avatar/:img', (req, res, next) => {
  let ruta = path.resolve('./','avatars/')
  res.sendFile(ruta + '/' +  req.params.img);
});

module.exports = router