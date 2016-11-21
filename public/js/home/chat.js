$(document).ready(function(){
   populateChat();
   var socket = io();
    socket.on('logon', function(data) {
      var div = $("#messages");
      if(data){
        $('#messages').append($('<li class="col-md-10 col-xs-10 text-center" style="color:grey;">').text(data + " está online"));
      }
      div.scrollTop(div.prop('scrollHeight'));
    });
    socket.on('chat message', function(msg){
      var str = msg.id.slice(0,6);
      var d = new Date();
      var data = jQuery.format.prettyDate(d);
      $('#messages').append($('<li id="msgNome" class="col-md-10 col-xs-10" style="color:grey;">').text(msg.nome + " ("+ data +")"));
      $('#messages').append($('<li class="chatMsg col-md-10 col-xs-10" style="color: white; background-color:#'+str+';">').text(msg.msg));
      var div = $("#messages");
      div.scrollTop(div.prop('scrollHeight'));
    });
});
function populateChat(){
    var tableContent = '';
    $.get('/chat', function (data) {
        for(var item in data){
            let idContato = data[item]._idContato;
            let cor = idContato.slice(5,11);
            let nome = data[item].nome;
            let texto = data[item].texto;
            let dataFormata = jQuery.format.prettyDate(data[item].data_msg);
            tableContent += '<li class="col-md-10 col-xs-10">'+nome+' ('+dataFormata+')</li>';
            tableContent += '<li class="chatMsg col-md-10 col-xs-10" style="background-color:#'+cor+'; color:white; opacity:0.8;">'+texto+'</li>';
        }
        $('#messages').html(tableContent);
    });
};