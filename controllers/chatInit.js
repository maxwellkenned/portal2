module.exports = function (app) {
    var Chat = app.models.chat;
    var io = app.get('io');

    io.on('connection', function (socket) {
        socket.emit('welcome', ExibirMsg());
       // socket.broadcast.emit('Contato', {userid: userid});
        
        socket.on('chat message', function(dados){
            io.emit('chat message', dados);
            SalvarMsg(dados);
        });
    });
    var SalvarMsg = function (dados) {
        var model = new Chat();
        model._idContato = dados.id;
        model.nome = dados.nome;
        model.texto = dados.msg;
        model.save(function (err) {
            if (err) console.log('Erro: '+err);
        });
    };

    var ExibirMsg = function () {
        Chat.find(function (err, dados) {
                if (err) {console.log('Erro: '+err)}
                else {
                    return dados;
                }
            });
    };
};

