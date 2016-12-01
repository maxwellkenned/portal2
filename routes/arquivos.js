module.exports = function (app) {
    'use strict';
    var Arquivo = app.models.arquivo;
    var arquivo = app.controllers.arquivo;
    var autenticar = require('../middleware/autenticar');
    
    app.post('/upload', autenticar, arquivo.upload);
    app.get('/uploads/:file', autenticar, arquivo.view);
    app.get('/show', autenticar, arquivo.show);
    app.get('/download/:file(*)', autenticar, arquivo.download);
    app.post('/pasta/criar', autenticar, arquivo.criarPasta);
    app.get('/file/remove/:id', autenticar, arquivo.remove);
    app.get('/p/:pasta(*)', autenticar, arquivo.showPasta);
    app.post('/showPastas', autenticar, arquivo.showPastas);
}