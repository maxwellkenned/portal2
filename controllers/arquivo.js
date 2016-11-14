var fs = require('fs');
var multer = require('multer');

module.exports = function (app) {
    'use strict';
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
    var upload = multer({storage: storage}).array('file');
    var Arquivo = app.models.arquivo;
    
    var ArquivoController = {
        upload: function (req, res) {
            var user = app.get('user');
            upload(req, res, function(err){
                var arquivos = req.files;
                arquivos.forEach(function(data){
                    var model = new Arquivo();
                    model._idUsuario = user._id;
                    model.originalname = data.originalname;
                    model.encoding = data.encoding;
                    model.mimetype = data.mimetype;
                    model.destination = data.destination;
                    model.filename = data.filename;
                    model.path = data.path;
                    model.ext = data.originalname.substr(data.originalname.lastIndexOf('.')+1);
                    model.size = data.size;
                    Arquivo.findOne({'_idUsuario': model._idUsuario,'filename': model.filename, 'path': model.path},function (err, dados){
                        if(dados){
                            console.log('Dados: '+dados);
                            model.update({upsert: true}, function(err){
                                if(err){
                                    req.flash('error', 'Não foi possível realizar o Upload');
                                } else {
                                    req.flash('info', 'Upload realizado com sucesso');
                                }
                            });
                        } else{
                            console.log('Model: '+model);
                            model.save(function(err){
                                if(err){
                                    console.log('Erro: '+err);
                                }
                            });
                        }
                    });
                    
                });
                console.log(req.files);
                if(err) {
                    return res.end("Error uploading file.");
                }
                req.flash('info', 'Upload resalizado com sucesso.');
                res.redirect('/');
            });
        },
        view: function (req, res) {
            file = req.params.file;
            var user = app.get('user');
            var dir = 'public/uploads/'; // give path
            var files = dir + user._id +'/';
            var img = fs.readFileSync(files + file);
            res.writeHead(200, {'Content-Type': 'image/jpg'});
            res.end(img, 'binary');
        },
        show: function (req, res) {
            var user = app.get('user');
            Arquivo.find({'_idUsuario': user._id}, function (err, data) {
                if(err) console.log('Erro: '+err);
                res.json(data);
            });
        },
        download: function (req, res) {
            var file = req.params.file;
            var user = app.get('user');
            var dir = 'public/uploads/'; // give path
            var files = dir + user._id +'/';
            var pasta = files+file;
            console.log(pasta);
            res.download(pasta); // magic of download fuction
        }
    };
    return ArquivoController;
};