var url = require('url');
module.exports = function (req, res) {
    'use strict';
    var createUrl = url.parse(req.url).pathname == "/usuarios/create";
    var updateUrl = !createUrl;
    console.log(createUrl);
    req.assert('nome', 'informe o seu nome.').notEmpty();
    req.assert('site', 'a URL não é válida.').isURL();

    //Validações para tela de cadastro
    if (createUrl) {
        req.assert('email', 'E-mail inválido.').isEmail();
        req.assert('senha', 'Sua senha deve conter no minimo 6 caracteres.').len(6, 10);
    }

    var validateErros = req.validationErrors() || [];

    //verificar se a senha confere
    if (req.body.senha != req.body.confirma_senha) {
        validateErros.push({msg: 'Senha não confere.'});
    }

    if (validateErros.length > 0) {
        validateErros.forEach(function (e) {
            req.flash('erro', e.msg);
        });
        return false;
    } else {
        return true;
    }
};