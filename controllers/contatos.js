var validacao = require('../validations/contatos');

module.exports = function (app) {
    'use strict';   
    var Contatos = app.models.contatos;
    var Usuarios = app.models.usuarios;

    var ContatoController = {
        home: function (req, res) {
            res.render('contatos/create');
        },
        index: function (req, res) {
            Contatos.find(function (err, dados) {
                if(err) {
                    req.flash('erro', 'Erro ao carregar:' + err);
                    req.render('contatos/index', {contatos: null});
                }
                res.render('contatos/index', {contatos: dados})
            });
        },
        create: function (req, res) {
            res.render('contatos/create', {model: new Contatos()});
        },
        salvar: function (req, res) {
            var model = new Contatos();
            var user = app.get('user');
            Usuarios.findById(req.params.id, function(err, data){
                if(data){
                    model.nome = data.nome;
                    model.sobrenome = data.sobrenome;
                    model.email = data.email;
                    model._idContato = data._id;
                    model._idUsuario = user._id;
                    Contatos.findOne({'email': model.email}, function (err, data) {
                        if (data) {
                            req.flash('erro', 'E-mail já cadastrado, informe outro.');
                            res.render('contatos/create', {model: model});
                        }else{
                           model.save(function (err) {
                                if (err) {
                                    req.flash('erro', 'Erro ao adicionar: ' + err);
                                    res.render('usuarios/create', {user: req.body, title: 'Adicionar contato'});
                                } else {
                                    req.flash('info', 'Contato: ' + model.nome + ', adicionado com sucesso!');
                                    res.redirect('/');
                                }
                            });
                        }
                    });
                } else {
                    console.log('ERRO: '+err);
                }
            });
        },
        show: function (req, res){
            var user = app.get('user');
            Contatos.find({'_idUsuario': user._id}, function (err, data) {
                if(err) console.log('Erro: '+err);
                res.json(data);
            });
        },
        excluir: function (req, res) {
            Contatos.remove({_id: req.params.id}, function(err) {
                if(err){
                    req.flash('erro', 'Erro ao excluir: ' + err);
                    req.redirect('/contatos'); 
                }else {
                    req.flash('info', 'Contato excluido com sucesso!');
                    req.redirect('/contatos'); 
                }
            });
        },
        editar: function (req, res) {
            Contatos.findById(req.params.id, function (err, dados) {
                if(err){
                    req.flash('erro', 'Erro ao carregar: ' + err);
                    req.redirect('/contatos');
                } else{
                    res.render('contatos/edit', {model: dados});
                }
            });
        },
        update: function (req, res){
            if (validacao(req, res)) {
                Contatos.findById(req.params.id, function (err, dados) {
                    var model = dados.
                    model.nome = req.body.nome;
                    model.email = req.body.email;

                    model.save(function (err) {
                        if (err) {
                            req.flash('erro', 'Erro ao atualizar: ' + err);
                            req.render('/contatos/edit', {model: model});
                        }else{
                            req.flash('info', 'Contato atualizado com sucesso!');
                            req.redirect('/contatos');
                        }
                    });
                });
            }else{
                res.render('contatos/edit', {model: req.body});
            }
        },
        busca: function (req, res) {
            Usuarios.findOne({'email': req.params.email},{nome: 1, sobrenome: 1, email: 1}, function(err, data){
                if (err) console.log(err);
                res.json(data);
            });
        }
    };

    return ContatoController;
};