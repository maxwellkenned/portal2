module.exports = function (app){
    'use strict';
    var Chat = app.models.chat;
    var ChatController = {
        show: function(req, res){
            var user = app.get('user');
            //Chat.find({'_idContato': user._id}, function(err, data){
            Chat.find(function(err, data){
                if(err) console.log('Erro: '+err);
                res.json(data);
            });
        }
    };
    return ChatController;
};