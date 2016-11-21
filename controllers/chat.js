module.exports = function (app){
    'use strict';
    var Chat = app.models.chat;
    var Contato = app.models.contato;
    var ChatController = {
        show: function(req, res){
            Chat.find(function(err, data){
                if(err) console.log('Erro: '+err);
                res.json(data);
            });
        }
    };
    return ChatController;
};