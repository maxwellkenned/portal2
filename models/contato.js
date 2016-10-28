var mongoose = require('mongoose');
module.exports = function () {
    'use strict';
    var contatosSchema = mongoose.Schema({
        tipo: {type: String, required:true, trim: true},
        telefone: {type: String, trim: true}
    });

    var contatoSchema = mongoose.Schema({
        nome: {type: String, required: true, trim: true},
        email: {type: String, trim: true, unique: true},
        contatos: [contatosSchema],
        data_cadastro: {type: Date, default: Date.now}
    });

    return mongoose.model('Contatos',contatoSchema);
};