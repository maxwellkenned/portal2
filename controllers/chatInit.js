module.exports = function (app) {
    var Chat = app.models.chat;
    var io = app.get('io');
    
    /* criar a conexão por websocket */
    io.on('connection', function(socket){
        var user = app.get('user');
        console.log('Usuário conectou');
        socket.on('disconnect', function(){
            console.log('Usuário desconectou');
        });

        socket.on('msgParaServidor', function(data){
            console.log('Nome: '+user.nome);
            /* dialogo */
            socket.emit(
                'msgParaCliente', 
                {apelido: user.nome, mensagem: data.mensagem}
            );

            SalvarMsg(data);

            socket.broadcast.emit(
                'msgParaCliente', 
                {apelido: user.nome, mensagem: data.mensagem}
            );

            /* participantes */
            if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
                socket.emit(
                    'participantesParaCliente', 
                    {apelido: user.nome}
                );

                socket.broadcast.emit(
                    'participantesParaCliente', 
                    {apelido: user.nome}
                );
            }
        });

    });
    var SalvarMsg = function (dados) {
        var model = new Chat();
        var user = app.get('user');
        model._idContato = user._id;
        model.nome = user.nome;
        model.texto = dados.mensagem;
        model.save(function (err) {
            if (err) console.log('Erro: '+err);
        });
    };
};