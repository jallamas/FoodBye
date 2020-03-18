'use strict'

const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const error_types = require('./error_types');
const _ = require('lodash');
const User = require('../models/user');

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
                    rol: req.body.rol,
                    avatar: req.body.avatar,
                    phone: req.body.phone,
                    password: hash
                });

                user.save((err, user) => {
                    if (err) next(new error_types.Error400(err.message));
                    res.status(201).json({
                        id: user._id,
                        user
                    });
                });
            }
        })
    },
    login: (req, res, next) => {
        passport.authenticate("local", { session: false }, (error, user) => {
            if (error || !user) {
                next(new error_types.Error404("El email o la contraseña no son correctos."))
            } else {
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
    }

}

module.exports = controller;