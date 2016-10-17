var mongoose = require('mongoose');
module.exports = function(uri) {
//conexão com o mongodb
mongoose.connect('mongodb://admin:82546459@ds019472.mlab.com:19472/portal', function (err) {
//mongoose.connect(uri, function (err) {
    'use strict';
    if (err) {
        console.log("Erro ao conectar mongodb: " + err);
    } else {
        console.log('Mongodb Conectado');
    }
});
mongoose.set('debug',true);
}