module.exports = function (app) {
    'use strict';
    var HomeController = {
        index: function (req, res) {
            var params = {title: 'Portal Share'};
            res.render('home/index', params);
        }
    };
    return HomeController;
};