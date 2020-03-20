'use strict'

const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const error_types = require('./error_types');
const _ = require('lodash');
const User = require('../models/user');
const fs = require("fs");
const { isValidObjectId } = require('mongoose');
const mongoose = require('mongoose');

let controller = {

    register: (req, res, next) => {
        let passwordD= req.body.passwordD;
        let password= req.body.password;
        User.find({ email: req.body.email }, (err, result) => {
            if (result.length > 0) {
                next(new error_types.InfoError("Este usuario ya existe en nuestra base de datos"));
            }
            else if (password!=passwordD) {
                next(new error_types.Error400("las contraseñas no coinciden"));
            }
            else if(password.length < 6){
                next(new error_types.Error400("la contraseña debe tener más de 6 caracteres"));
            } 
            else {
                let hash = bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS));
                let user = new User({
                    fullname: req.body.fullname,
                    email: req.body.email,
                    rol: "BIKER",
                    phone: req.body.phone,
                    password: hash
                });

                if (req.file != undefined) {
                    user.avatar = {
                        data: req.file.buffer.toString('base64'),
                        contentType: req.file.mimetype
                      }
                  }

                user.save((err, user) => {
                    let userResponse={
                        id: user.id,
                        fullname: user.fullname,
                        email:  user.email,
                        rol: user.rol,
                        avatar: user.avatar != null ? '/avatars/' + user.id : null,
                        validated: user.validated,
                        phone:user.phone
                    }
                    if (err) next(new error_types.Error400(err.message));
                    res.status(201).json({
                        userResponse
                    });
                });
            }
        })
    },
    login: (req, res, next) => {
        passport.authenticate("local", { session: false }, (error, user) => {
            if (error || !user) {
                next(new error_types.Error404("El email o la contraseña no son correctos."))
            }
            else if(user.validated === false){
                next(new error_types.Error404("No te puedes loguear porque no estás validado"))
            }
            else {
                const payload = {
                    sub: user._id,
                    exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
                    email: user.email,
                };

                const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET, { algorithm: process.env.JWT_ALGORITHM });
                res.json({
                    email: user.email,
                    token: token
                })

            }
        })(req, res)
    },
    getUsuarios: (req, res, next)=>{
        User.find((err, users)=> {
        if (err) return console.error(err);
        res.status(200).json(users);
        });
    },
    getUsuariosNoValidados: (req, res, next)=>{
        User.find({validated:false},(err, users)=> {
        if (err) return console.error(err);
        res.status(200).json(users);
        });
    },
    getUsuariosValidados: (req, res, next)=>{
        User.find({validated:true},(err, users)=> {
        if (err) return console.error(err);
        res.status(200).json(users);
        });
    },
    getUsuariosBikers: (req, res, next)=>{
        User.find({rol:'BIKER'},(err, users)=> {
        if (err) return console.error(err);
        res.status(200).json(users);
        });
    },
    putValidarUsuario: (req,res,next)=>{
        User.findByIdAndUpdate (mongoose.Types.ObjectId(req.params.id),{$set: {'validated': true}} ,{new: true}, (err, user) => {
            if (err) next(new error_types.Error500(err.message));
            else if (user == null) 
                next(new error_types.Error404("No se ha encontrado ningún usuario con ese ID"))
            else
                res.status(200).json(user);
        });
    },
    putInhabilitar: (req,res,next)=>{
        User.findByIdAndUpdate (mongoose.Types.ObjectId(req.params.id),{$set: {'validated': false}} ,{new: true}, (err, user) => {
            if (err) next(new error_types.Error500(err.message));
            else if (user == null) 
                next(new error_types.Error404("No se ha encontrado ningún usuario con ese ID"))
            else
                res.status(200).json(user);
        });
    },
    deleteUser: ({ params },res,next) =>{
        User.findByIdAndRemove({ _id: mongoose.Types.ObjectId(params.id) }, (err, usuario) => {
        if (err) return next(new error_types.Error500(err.message));
        else if(!usuario) return next(new error_types.Error404("No se ha encontrado ningún usuario con ese ID"+params.id))
        else{
            const response = {
                message: "Usuario borrado",
            };
            return res.status(200).send(response);
        }
        });
    },
    getAvatar: ({ params }, res, next) =>{
    User.findById(params.id)
      .then(notFound(res))
      .then((user) => {
        if (user.avatar != undefined) {
            res.contentType(user.avatar.contentType)
            res.send(Buffer.from(user.avatar.data, 'base64'))
        }
        else
          res.sendStatus(404)
      })
      .catch(next)
    },
    editUser: function(req, res) {
        User.findById(req.params.id, function(err, user) {
            user.fullname   = req.body.fullname;
            user.email    = req.body.email;
            user.phone = req.body.phone;
            
            let userResponse={
                id: user.id,
                fullname: user.fullname,
                email:  user.email,
                rol: user.rol,
                avatar: user.avatar != null ? '/avatars/' + user.id : null,
                validated: user.validated,
                phone:user.phone
            }
            user.save(function(err) {
                if(err) return res.status(500).send(err.message);
            res.status(200).jsonp(userResponse);
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