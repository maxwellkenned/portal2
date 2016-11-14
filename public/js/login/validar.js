$('#loginform').submit(function () {
      var senha  = $('#login-password').val().length;
      var email = $('#login-username').val().length;
      if(email < 1 && senha < 1){
        $.notify('E-mail e senha não informados', 'error');
        $('#login-username').focus();
        return false;
      } else if(email < 1){
        $.notify('E-mail não informada', 'error');
        $('#login-username').focus();
        return false;
      } else if(senha <1){
        $('#login-password').notify('Senha não informada','error', { position:"bottom"});
        $('#login-password').focus();
        return false;
      }
    });