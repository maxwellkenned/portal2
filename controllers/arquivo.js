var fs = require('fs');
var multer = require('multer');
var util = require('util');
var deleteDirR = require('./helpers/delete-dir-r.js');
module.exports = function (app) {
    'use strict';
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            var user = app.get('user');
            var dir = 'public/uploads/'; // give path
            var files = dir + user._id +'/';
            cb(null, files);
        },
        filename: function (req, file, cb) {
            var ext = file.originalname.substr(file.originalname.lastIndexOf('.')+1); cb(null, file.originalname);
        }
    });
    var upload = multer({storage: storage}).array('file');
    var Arquivo = app.models.arquivo;
    var Helpers = app.controllers.helpers;
    
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
                            model.update({upsert: true}, function(err){
                                if(err){
                                    req.flash('error', 'Não foi possível realizar o Upload');
                                } else {
                                    req.flash('info', 'Arquivo atualizado com sucesso');
                                }
                            });
                        } else{
                            model.save(function(err){
                                if(err){
                                    console.log('Erro: '+err);
                                } else {
                                    req.flash('info', 'Upload realizado com sucesso');
                                }
                            });
                        }
                    });
                    
                });
                if(err) {
                    return res.end("Error uploading file.");
                }
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
            res.download(pasta); // magic of download fuction
        },
        clearPasta: function (req, res, id) {
            var dir = 'public/uploads/';
            var item = [];
            var pasta = dir + id + '\\';
            if(fs.existsSync(pasta)){
                fs.readdir(pasta, function (err, data){
                    if(err){
                        console.log('fs.readdir Erro: '+err);
                    } else if(data){
                        data.forEach(function (data2) {
                            Arquivo.findOne({'filename': data2}, function (err, data3){
                                if(data3){
                                    item.push(data3.filename);
                                } else if (err) {
                                    console.log('Arquivo.findOne Erro: '+err);
                                }
                            });
                        });    
                    }
                });
            if(0>1){
                fs.rmdir(pasta, function(args){
                    if(args){
                        console.log('Erro: '+args);
                    }                  
                });
            }
            }
        }
    };
    return ArquivoController;
};