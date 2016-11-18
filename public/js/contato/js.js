$(function () {
    $('#busca-contato-form').submit(function(){
    var $busca = $("input[name='busca']").val();
    var $nome = $("input[name='nome']");
    var $sobrenome = $("input[name='sobrenome']");
    var $email = $("input[name='email']");
    if($busca){
        $nome.val('Carregando...');
        $sobrenome.val('Carregando...');
        $email.val('Carregando...');

        $.getJSON('/contatos/buscar/' + $busca, function(data){
            $nome.val(data.nome);
            $sobrenome.val(data.sobrenome);
            $email.val(data.email);
            $('#adicionar').attr("href", "/contatos/adicionar/"+data._id);
            console.log('data.nome'+data._id);
        });
    }
        return false;
    });
});