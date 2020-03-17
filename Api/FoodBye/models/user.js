'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imgSchema = new Schema({
    data: String, 
    contentType: String
});

const userSchema = Schema({
    fullname: String,
    created_date: { type: Date, default: Date.now },
    password: String,
    email: String,
    picture: imgSchema,
    rol: { type: String, enum: ['BIKER', 'ADMIN'] },
    phone: String,
    validated: {
        type: Boolean,
        default: false
      }
    });

module.exports = mongoose.model('User', userSchema);