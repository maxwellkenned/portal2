module.exports = function (app) {
    'use strict';
    var usuarios = app.controllers.usuarios;
    app.get('/usuarios', usuarios.index);
    app.route('/usuarios/create')
        .get(usuarios.create)
        .post(usuarios.post);
    app.get('/usuarios/show/:id', usuarios.show);
    app.post('/usuarios/delete/:id', usuarios.delete);
    app.route('/usuarios/edit/:id')
        .get(usuarios.edit)
        .post(usuarios.update);
};