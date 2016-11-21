var fs = require('fs');
var util = require('util');
module.exports = function (app) {
    'use stinct';
    var Arquivo = app.controllers.arquivo;

    var HelpersController = {
    // Criar a Pasta do usuario para Upload. Verifica se já existe, se não existir ele cria.
    criarPasta: function (req, res, id){
    Arquivo.clearPasta(req, res, id);
    var user = id;
    var dir = 'public/uploads/'; // give path
    var files = dir + user +'/';
    
        fs.exists(dir, (exists) => {
         if(!exists){
            fs.mkdir(dir, function(args){
            });
         }
        });
        fs.exists(files, function(exists){
            if(!exists){
                fs.mkdir(files, function(args){
                });
            }else{
                console.log('erro');
            }
        });
    }
    };

    return HelpersController;
};