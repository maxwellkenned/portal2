$(document).ready(function(){
  populateChat();
  var socket = io();

  $("#exibe_chat").click(function(){
    $("#conversa").show();
    $("#participantes").hide();
    $("#antigas").hide();
    ocultaNavbar();
  });
  
  $("#exibe_participantes").click(function(){
    $("#participantes").show();
    $("#conversa").hide();
    $("#antigas").hide();
    ocultaNavbar();
  });
  $("#exibe_antigas").click(function(){
    $("#antigas").show();
    $("#participantes").hide();
    $("#conversa").hide();
    var divDialog = document.getElementById('antigas');
    var divAlt = divDialog.scrollHeight;
    divDialog.scrollTo(0, divAlt);
    ocultaNavbar();
  });
  exibe_antigas
  function ocultaNavbar(){
    $("#btn_navbar_toggle").attr("class","navbar-toggle collapsed");
    $("#navbar-collapse-1").attr("class","navbar-collapse collapse");
    $("#btn_navbar_toggle").attr("aria-expanded","false");
    $("#navbar-collapse-1").attr("aria-expanded","false");
  };

    // socket.on('logon', function(data) {
    //   var div = $("#messages");
    //   if(data){
    //     $('#messages').append($('<li class="col-md-10 col-xs-10 text-center" style="color:grey;">').text(data + " está online"));
    //   }
    //   div.scrollTop(div.prop('scrollHeight'));
    // });
    // socket.on('chat message', function(msg){
    //   var str = msg.id.slice(0,6);
    //   var d = new Date();
    //   var data = jQuery.format.prettyDate(d);
    //   $('#messages').append($('<li id="msgNome" class="col-md-10 col-xs-10" style="color:grey;">').text(msg.nome + " ("+ data +")"));
    //   $('#messages').append($('<li class="chatMsg col-md-10 col-xs-10" style="color: white; background-color:#'+str+';">').text(msg.msg));
    //   var div = $("#messages");
    //   div.scrollTop(div.prop('scrollHeight'));
    // });
});
function populateChat(){
    var tableContent = '';
    $.get('/chat', function (data) {
        for(var item in data){
            var html = '';
            let nome = data[item].nome;
            let texto = data[item].texto;
            let dataFormata = jQuery.format.prettyDate(data[item].data_msg);
            html += '<div class="dialogo">';
              html += '<h4>' + nome + '  -  '+dataFormata+'</h4>';
              html += '<p>' + texto + '</p>';
            html += '</div>';

        $('#msgs').append(html);
        };
    });
};