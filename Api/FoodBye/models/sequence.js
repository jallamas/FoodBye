'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const getValueForNextSequence = (seq) => {
    const db = mongoose.connections[0].db
    return db.collection('sequences').findOneAndUpdate(
        { _id: seq },
        { $inc: { sequence_value: 1 } },
        { 
            projection: {_id: 0, sequence_value: 1}, 
            returnNewDocument: true }
        )  
};

const getCompleteCode = (seq) => {
    return getValueForNextSequence(seq)
        .then((result) => result.value.sequence_value)
        .then((value) => seq + pad(value, TAMCODIGO))
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

const TAMCODIGO = 6

module.exports = getCompleteCode;

