'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    fullname: String,
    created_date: { type: Date, default: Date.now },
    password: String,
    email: String,
    rol: { type: String, enum: ['BIKER', 'ADMIN'] }
});

module.exports = mongoose.model('User', userSchema);