module.exports = function () {
    req.assert('nome', 'Informe o nome').notEmpty();
    req.assert('email', 'E-mail inválido').isEmail();

    var validacoesErros = req.validationErrors() || [];

    if(validationErrors.length > 0) {
        validationErrors.forEach(function (e) {
            req.flash('erro', e.msg);
        });
        return false;
    }
    return true;
}