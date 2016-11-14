var mongoose = require('mongoose');
module.exports = function () {
    'use strict';
    var permitidosSchema = mongoose.Schema({
        _idContato: {type: String, trim: true},
        email: {type: String, trim: true}
    });

    var arquivoSchema = mongoose.Schema({
        _idUsuario: {type: String, required: true, trim: true},
        originalname: {type: String, trim: true},
        encoding: {type: String, trim: true},
        mimetype: {type: String, trim: true},
        destination: {type: String, trim: true},
        filename: {type: String, trim: true},
        path: {type: String, trim: true},
        size: {type: Number, trim: true},
        ext: {type: String, trim: true},
        permitidos: [permitidosSchema],
        data_upload: {type: Date, default: Date.now}
    });

    return mongoose.model('Arquivo', arquivoSchema);
};
