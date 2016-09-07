module.exports = function (app) {
    'use strict';
    var UsuariosController = {
        index: function (req, res) {
            res.render('usuarios/index');
        },
        create: function (req, res) {
            res.render('usuarios/create');
        }
    };
    return UsuariosController;
};