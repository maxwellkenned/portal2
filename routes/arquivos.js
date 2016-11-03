module.exports = function (app) {
    'use strict';

    var multer = require('multer');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            var user = app.get('user');
            var dir = 'public/uploads/'; // give path
            var files = dir + user._id +'/';
            cb(null, files);
            console.log(files);
    },
        filename: function (req, file, cb) {
            var ext = file.originalname.substr(file.originalname.lastIndexOf('.')+1); cb(null, file.originalname);
    }
    });
    
    var upload = multer({storage: storage});
    var files = app.controllers.arquivo;
    var autenticar = require('../middleware/autenticar');
    app.post('/upload', autenticar, upload.array('file'), files.upload);


    app.get('/uploads/:file', files.view);
    app.get('/show', files.show);
    app.get('/download/:file(*)', files.download);
}