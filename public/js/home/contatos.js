$(document).ready(function(){
   populateContatos(); 
});
function populateContatos(){
    var tableContent = '';
    $.get('/contatos/show', function (data) {
        for(var item in data){
            if(data){
            let nome = data[item].nome;
            let email = data[item].email;
            // tableContent += '<tr style="">';
            // tableContent += '<td><i class="fa fa-user" aria-hidden="true"></i></td>'
            // tableContent += '<td>'+nome+'</td>';
            // tableContent += '<td>'+email+'</td>';
            // tableContent += '</tr>';
            var html = '';
            html += '<div class="dialogo">'
            html += '<span class="participante align-middle">';
            html += '<img src="images/ico_usuario.png">';
            html += '<strong> '+nome+'</strong><br>E-mail: '+email;
            html += '</span>';
            html += '</div>'
            }
            $('#pessoas').append(html);
        } 
    });
};