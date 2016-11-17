$(document).ready(function(){
   populateChat(); 
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