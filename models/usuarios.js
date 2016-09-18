var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

module.exports = function () {
    'use strict';
    var usuarioSchema = mongoose.Schema({
        nome: {type: String, trim: true},
        email: {type: String, trim: true, unique: true, index: true},
        site: {type: String, trim: true},
        senha: {type: String},
        data_cadastro: {type: Date, default: Date.now}
    });
    usuarioSchema.methods.generateHash = function (senha) {
        return bcrypt.hashSync(senha, bcrypt.genSaltSync(8), null);
    };
    usuarioSchema.methods.validaSenha = function (senha, old_senha) {
        return bcrypt.compareSync(senha, old_senha, null);
    }
    
    return mongoose.model('Usuarios', usuarioSchema);
};