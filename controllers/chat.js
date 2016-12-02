module.exports = function (app){
    'use strict';
    var Chat = app.models.chat;
    var Contato = app.models.contato;
    
    var ChatController = {
        show: function(req, res){
            var user = app.get('user');
            app.get('io').emit('participantesParaCliente', {apelido: user.nome});
            app.get('io').emit('msgParaCliente', {apelido: user.nome, mensagem: ' acabou de entrar no chat'});
            Chat.find(function(err, data){
                if(err) console.log('Erro: '+err);
                res.json(data);
            });
        }
    };
    return ChatController;
};