module.exports = function (app) {
    'use strict';
    var home = app.controllers.home;
    var autenticar = require('../middleware/autenticar');
    var alterIndex = require('../middleware/alterIndex');
    app.get('/', alterIndex, home.login);
    app.post('/', home.autentication);
    app.get('/home', autenticar, home.index);
    app.get('/sair', home.logout);
    app.get('/registrar', home.registrar);
    app.post('/registrar', home.registro);
};