var fs = require('fs');

module.exports = function (app) {
    'use strict';
    var ArquivoController = {
        upload: function (req, res) {
            // fs.readFile(req.files.file.path, function(err, data) {
            //     var dirname = 'public/uploads/';
            //     var newPath = dirname + req.files.file.originalFilename;

            //     fs.writeFile(newPath, data, function (err) {
            //         if(err){
            //             req.flash('erro', 'Falha no upload: \n'+err);
            //             res.redirect('/');
            //         } else {
            //             req.flas('info', 'Upload realizado com sucesso.');
            //             res.redirect('/');
            //         }
            //     });
            //     });
            req.flash('info', 'Upload realizado com sucesso.');
            res.redirect('/');
        },
        view: function (req, res) {
            file = req.params.file;
            var dir = 'public/uploads/';
            var img = fs.readFileSync(dir + file);
            res.writeHead(200, {'Content-Type': 'image/jpg'});
            res.end(img, 'binary');
        },
        show: function (req, res) {
            var dir = 'public/uploads/'; // give path
            fs.readdir(dir, function(err, list) { // read directory return  error or list
            if (err) return res.json(err);
            else res.json(list);
             });
        },
        download: function (req, res) {
            var file = req.params.file;
            var pasta = 'public/uploads/'+file;
            console.log(pasta);
            res.download(pasta); // magic of download fuction
        }

    };
    return ArquivoController;
};