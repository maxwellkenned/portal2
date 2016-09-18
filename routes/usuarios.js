module.exports = function (app) {
    'use strict';
    var usuarios = app.controllers.usuarios;
    var autenticar = require('../middleware/autenticar');

    app.get('/usuarios', autenticar, usuarios.index);
    app.route('/usuarios/create')
        .get(autenticar, usuarios.create)
        .post(usuarios.post);
    app.get('/usuarios/show/:id', autenticar, usuarios.show);
    app.post('/usuarios/delete/:id', usuarios.delete);
    app.route('/usuarios/edit/:id')
        .get(autenticar, usuarios.edit)
        .post(usuarios.update);
};