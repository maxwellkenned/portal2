module.exports = function (req, res, next) {
    'use strict';
    if (req.session.usuario && req.session.usuario.tipo_user == 3) {
        return next();
    }
    return res.redirect('/');
};