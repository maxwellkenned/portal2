module.exports = function (app) {
    'use strict';
    var Arquivo = app.models.arquivo;
    var arquivo = app.controllers.arquivo;
    var autenticar = require('../middleware/autenticar');
    
    app.post('/upload', autenticar, arquivo.upload);
    app.get('/uploads/:file', arquivo.view);
    app.get('/show', arquivo.show);
    app.get('/download/:file(*)', arquivo.download);
}