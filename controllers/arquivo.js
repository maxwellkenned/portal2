var fs = require('fs');
var multer = require('multer');
var util = require('util');
var deleteDirR = require('./helpers/delete-dir-r.js');
var Promise = require('promise');
var _ = require('lodash');
module.exports = function (app) {
    'use strict';
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            let user = app.get('user');
            let dir = 'public/uploads/'; // give path
            let files = dir + user._id +'/';
            cb(null, files);
        },
        filename: function (req, file, cb) {
            let ext = file.originalname.substr(file.originalname.lastIndexOf('.')+1); cb(null, file.originalname);
        }
    });
    let upload = multer({storage: storage}).array('file');
    let Arquivo = app.models.arquivo;
    let Helpers = app.controllers.helpers;    
    let chatCtrl = app.controllers.chatInit;
    
    let ArquivoController = {
        upload: function (req, res) {
            let user = app.get('user');
            let dest = '/';
            if(req.params.pasta == '/home' || req.params.pasta == 'home'){
                dest = '';
            } else{
                dest = req.params.pasta;
            }
            upload(req, res, function(err){
                let arquivos = req.files;
                arquivos.forEach(function(data){
                    let model = new Arquivo();
                    model._idUsuario = user._id;
                    model.originalname = data.originalname;
                    model.encoding = data.encoding;
                    model.mimetype = data.mimetype;
                    model.destination = data.destination+dest;
                    model.filename = data.filename;
                    model.path = data.destination+dest+data.filename;
                    model.ext = data.originalname.substr(data.originalname.lastIndexOf('.')+1);
                    model.size = data.size;
                    Arquivo.findOne({'_idUsuario': model._idUsuario,'filename': model.filename, 'destination': data.destination+dest},function (err, dados){
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
            let user = app.get('user');
            let dir = 'public/uploads/'; // give path
            let files = dir + user._id +'/';
            let img = fs.readFileSync(files + file);
            res.writeHead(200, {'Content-Type': 'image/jpg'});
            res.end(img, 'binary');
        },
        show: function (req, res) {
            chatCtrl;
            res.render('home/index');
        },
        showPasta: function (req, res) {
            let user = app.get('user');
            let dir = 'public/uploads/'+user._id+'/';
            let pathname = req.params.pasta;
            if(req.params.pasta != 'show'){
                dir += pathname;
            }
            let dados = new Arquivo();
            function readPasta(){
                return new Promise(function(fulfill, reject){
                    Arquivo.find({'destination': dir}, function (err, data) {
                        if(err){
                            reject(err);
                        }else{
                            fulfill(data);
                        }
                    }).sort({'ext': 1, 'data_upload': -1});
                });
            };
            readPasta()
            .then(function(dados){
                res.json(dados);
            });
                
        },
        showPastas: function(req, res) {
            let user = app.get('user');
            let dir = req.body.dir;
            if(dir == 'public/uploads/'){
                dir = 'public/uploads/'+user._id+'/';
            }
            console.log('dir pastas: '+ dir);
            let r = '<ul class="jqueryFileTree" style="display: none;">';
            try {
                r = '<ul class="jqueryFileTree" style="display: none;">';
                let dirDecoded = decodeURIComponent(dir);
                let files = fs.readdirSync(dirDecoded);
                files.forEach(function(f){
                    let ff = dirDecoded + decodeURIComponent(f);
                    let ffEncoded = dir + encodeURIComponent(f);
                    let stats = fs.statSync(ff);
                    if (stats.isDirectory()) { 
                        r += '<li class="directory collapsed"><a href="#" rel="' + ffEncoded + '/">' + f + '</a></li>';
                    } else {
                        let e = f.split('.')[1];
                        r += '<li class="file ext_' + e + '"><a href="#" rel='+ ffEncoded + '>' + f + '</a></li>';
                    }
                });
                r += '</ul>';
            } catch(e) {
                r += 'Could not load directory: ' + dirDecoded;
                r += '</ul>';
            }
            res.send(r);
        },
        download: function (req, res) {
            let file = req.params.file;
            let user = app.get('user');
            let dir = 'public/uploads/'; // give path
            let files = dir + user._id +'/';
            let pasta = files+file;
            res.download(pasta); // magic of download fuctio
        },
        clearPasta: function (req, res, id) {
            let dir = 'public/uploads/';
            let item = [];
            let pasta = dir + id + '/';
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
        },
        criarPasta: function(req, res){
            let nomePasta = req.body.nomePasta;
            let user = app.get('user');
            let pathname;
            if(req.body.pathname == '/home' || req.body.pathname == 'home'){
                pathname = '/';
            }else{
                pathname = req.body.pathname;
            }
            console.log("@@@URL: "+pathname);
            let dir = 'public/uploads/'+user._id+pathname;
            console.log('DIR: '+dir);
            let pasta = dir+nomePasta+'/';
            let model = new Arquivo();
                model._idUsuario = user._id;
                model.originalname = nomePasta;
                model.destination = dir;
                model.filename = nomePasta;
                model.mimetype = 'folder';
                model.path = pasta;
                model.ext = '/';
                Arquivo.findOne({'_idUsuario': model._idUsuario,'filename': model.filename, 'destination': model.destination},function (err, dados){
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
                            } else {
                                if(!fs.existsSync(pasta)){
                                    fs.mkdir(pasta, function(args){
                                    });
                                }
                                res.end();
                            }
                        });
                    }
                });
        },
        remove: function(req, res){
            let filename = '';
            let destination = '';
            let pasta = '';
            var id = req.params.id;
                function remover(id_){
                    return new Promise(function(fulfill, reject){
                        Arquivo.findById({'_id': id_}, function(err, data){
                            if(err) reject(err);
                            if(data){
                                fulfill(data);
                            }
                        });
                    });
                };
                remover(id)
                .then(function(data2){
                    filename = data2.filename;
                    destination = data2.destination;
                    Arquivo.remove({_id: req.params.id}, function(err){
                    if (err)
                        req.flash('erro', 'Erro ao excluir arquivo: ' + err);
                        res.redirect('/home');
                    });
                })
                .then(function(){
                     if(fs.existsSync(destination)){
                        pasta = destination + filename;
                        if(fs.existsSync(pasta)){
                            if (fs.lstatSync(pasta).isDirectory()){
                                fs.rmdirSync(pasta);
                                console.log('remover pasta: '+pasta);
                            }else {
                                fs.unlinkSync(pasta);
                                console.log('remover arquivo: '+pasta);
                            }
                        }
                    }
                })
                .then(function(){
                    req.flash('info', 'Excluido com sucesso');
                    req.redirect('/home');
                });
        }
    };
    return ArquivoController;
};