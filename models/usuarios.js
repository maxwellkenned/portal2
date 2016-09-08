var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

module.exports = function () {
    'use strict';
    var usuarioSchema = mongoose.Schema({
        nome: {type: String, trim: true},
        email: {type: String, trim: true},
        site: {type: String, trim: true},
        senha: {type: String},
        data_cadastro: {type: Date, default: Date.now}
    });
    usuarioSchema.methods.generateHash = function (senha) {
        return bcrypt.hashSync(senha, bcrypt.genSaltSync(8), null);
    };
    return mongoose.model('Usuarios', usuarioSchema);
};