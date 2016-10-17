var mongoose = require('mongoose');

module.exports = function () {
    'use strict';
    var chatSchema = mongoose.Schema({
        nome: {type: String, trim: true},
        texto: {type: String, trim: true},
        data_msg: {type: Date, default: Date.now}
    });
    return mongoose.model('Chat', chatSchema);
};