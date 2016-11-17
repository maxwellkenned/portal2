$('#loginform').submit(function () {
  let senha  = $('#login-password').val().length;
  let email = $('#login-username').val().length;
  if(email < 1 && senha < 1){
    $('#login-username').notify('E-mail e senha não informados', 'error');
    $('#login-username').focus();
    return false;
  } else if(email < 1){
    $('#login-username').notify('E-mail não informada', 'error');
    $('#login-username').focus();
    return false;
  } else if(senha <1){
    $('#login-password').notify('Senha não informada','error', { position:"bottom"});
    $('#login-password').focus();
    return false;
  }
});
$('#register-form').submit(function(){
  let nome =  $('#nome').val();
  let sobrenome =  $('#sobrenome').val();
  let email =  $('#email').val();
  let senha =  $('#senha').val();
  let confirSenha = $('#confirma_senha').val();
  
  if(nome.length < 1){
    $('#nome').notify('Infome o nome', 'error');
    $('#nome').focus();
    return false;
  } else if(sobrenome.length < 1){
    $('#sobrenome').notify('Infome o sobrenome', 'error');
    $('#sobrenome').focus();
    return false;
  }else if(senha.length < 6){
    $('#senha').notify('A senha deve ser maior que 6 caracteres', 'error');
    $('#senha').focus();
    return false;
  }else if(senha.length < 1 ){
    $('#senha').notify('Infome a senha', 'error');
    $('#senha').focus();
    return false;
  }else if(confirSenha.length < 1){
    $('#confirma_senha').notify('Confirme a senha', 'error');
    $('#confirma_senha').focus();
    return false;
  }else if (senha !== confirSenha){
    $('#confirma_senha').notify('Senha de confirmação não confere', 'error');
    $('#confirma_senha').focus();
    return false;
  }
});