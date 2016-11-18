module.exports = function (app) {
    'use strict';
    var usuarios = app.controllers.usuarios;
    var autenticar = require('../middleware/autenticar');
    var autAdmin = require('../middleware/autAdmin');

    app.get('/usuarios', autAdmin, usuarios.index);
    app.route('/usuarios/create')
        .get(autenticar, usuarios.create)
        .post(usuarios.post);
    app.get('/usuarios/show/:id', autAdmin, usuarios.show);
    app.post('/usuarios/delete/:id', usuarios.delete);
    app.route('/usuarios/edit/:id')
        .get(autAdmin, usuarios.edit)
        .post(usuarios.update);
    app.get('/limparDiretorio', autAdmin, usuarios.limparDir);
};