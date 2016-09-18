module.exports = function (req, res) {
    'use strict';
    req.assert('email', 'E-mail inválido').isEmail();
    req.assert('senha', 'Senha deve ter no mínimo 6 caracteres.').len(6, 50);

    var validacaoErros = req.validationErrors() || [];

    if (validacaoErros.length > 0) {
        validacaoErros.forEach(function (e) {
            req.flash('erro', e.msg);
        });
        return false;
    }
    return true;
};