'use strict'

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const user_routes = require('./routes/users');
const pedido_routes = require('./routes/pedido');
const middleware = require('./middleware/index');
const User = require('./models/user');
const cors = require('cors')
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Conectado!');
    db.collection('sequences').countDocuments()
      .then((c) => {
        if (c < 1) {
          const tipos = ['Pedido']
          const array = tipos.map((tipo) => { return {
                _id: tipo,
                sequence_value: 1
          }})
          db.collection('sequences').insertMany(array)
        }
      })
});

passport.use(new LocalStrategy((username, password, done) => {
    let busqueda = { email: username };

    User.findOne(busqueda, (err, user) => {
        if (err) return done(null, false);
        if(user==null) return done(null, false);
        if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false);
        }
        return done(null, user);
    });
}));

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
opts.algorithms = [process.env.JWT_ALGORITHM];

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.sub, (err, user) => {
        if (err) return done(null, false);
        else return done(null, user);
    });
}));

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(passport.initialize())

app.use('/api/', user_routes);
app.use('/pedido/', pedido_routes);
app.use(middleware.errorHandler);
app.use(middleware.notFoundHandler);

module.exports = app
