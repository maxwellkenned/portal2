module.exports = function (req, res, next) {
    'use strict';
    if (req.session.usuario) {
        return next();
    }
    return res.redirect('/');
};