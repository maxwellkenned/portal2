module.exports = function (app) {
    var Chat = app.models.chat;
    var io = app.get('io');

    io.on('connection', function (socket) {
        socket.emit('welcome', ExibirMsg());
       // socket.broadcast.emit('Contato', {userid: userid});
       
        ExibirMsg();

        socket.on('chat message', function(msg){
            io.emit('chat message', msg);
            SalvarMsg(msg);
        });
    });

    var SalvarMsg = function (msg) {
        var model = new Chat();
        model.texto = msg;
        model.save(function (err) {
            console.log('Erro: '+err);
        });
    };

    var ExibirMsg = function () {
        var params = {};
        Chat.find(function (err, dados) {
                if (err) {console.log('Erro: '+err)}
                else {
                    params = {lista: dados};
                }
            console.log(params);
            });
    };
};

