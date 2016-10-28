var multer = require('multer');
var storage = multer.diskStorage({destination: function (req, file, cb) {cb(null, 'public/uploads/')},filename: function (req, file, cb) {var ext = file.originalname.substr(file.originalname.lastIndexOf('.')+1); cb(null, file.originalname);}});
var upload = multer({storage: storage});
module.exports = function (app) {
    'use strict';

    var files = app.controllers.arquivo;
    app.post('/upload', upload.single('file'), files.upload);
    app.get('/uploads/:file', files.view);
    app.get('/show', files.show);
    app.get('/download/:file(*)', files.download);
}