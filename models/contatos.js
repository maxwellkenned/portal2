var mongoose = require('mongoose');
module.exports = function () {
    'use strict';
    var contatosSchema = mongoose.Schema({
        tipo: {type: String, trim: true},
        telefone: {type: String, trim: true}
    });

    var contatoSchema = mongoose.Schema({
        _idUsuario: {type: String, trim: true},
        _idContato: {type: String, trim: true},
        nome: {type: String, trim: true},
        sobrenome: {type: String, trim: true},
        email: {type: String, trim: true, unique: true},
        contatos: [contatosSchema],
        data_cadastro: {type: Date, default: Date.now}
    });

    return mongoose.model('Contatos',contatoSchema);
};