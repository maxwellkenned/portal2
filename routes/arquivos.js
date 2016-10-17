var multer = require('multer');
var storage = multer.diskStorage({destination: function (req, file, cb) {cb(null, 'public/uploads')},filename: function (req, file, cb) {var ext = file.originalname.substr(file.originalname.lastIndexOf('.')+1); cb(null, file.originalname);}});
var upload = multer({storage: storage});
module.exports = function (app) {
    'use strict';

    app.post('/file', upload.single('arquivo'), function (req, res, next) {
        console.log(req.file);
        res.redirect('/');
    });
}