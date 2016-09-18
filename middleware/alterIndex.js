module.exports = function (req, res, next) {
    'use strict';
    if (!req.session.usuario) {
        return next();
    }
    res.redirect('/home');

};