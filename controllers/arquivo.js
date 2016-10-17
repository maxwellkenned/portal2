var multer = require('multer');
var storage = multer.diskStorage({destination: function (req, file, cb) {cb(null, 'public/'+req.session._id)},filename: function (req, file, cb) {var ext = file.originalname.substr(file.originalname.lastIndexOf('.')+1); cb(null, file.fieldname + '-' + Date.now() + ext)}});
var upload = multer({storage: storage});
module.exports = function () {
    'use strict';
    var ArquivoController = {
        upload: function (req, res){
            upload.single('arquivo');
        },
        next: function (req, res, next){
            console.log(req.file);
            res.redirect('/');
        }
    }
    return ArquivoController;
};