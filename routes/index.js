module.exports = function (app) {
    'use strict';
    var home = app.controllers.home;
    app.get('/', home.index);
};