module.exports = function (app) {
    'use strict';

    var contato = app.controllers.contatos;
    var autenticar = require('../middleware/autenticar');

    app.get('/contatos', autenticar, contato.home);
    app.get('/contatos/buscar/:email', autenticar, contato.busca);
    app.get('/contatos/adicionar/:id', autenticar, contato.salvar);
    app.get('/contatos/show', contato.show);
}