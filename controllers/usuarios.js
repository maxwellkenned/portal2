module.exports = function (app) {
    'use strict';
    var validacao = require('../validations/usuarios');
    var Usuario = app.models.usuarios;

    var UsuariosController = {
        index: function (req, res) {
            Usuario.find(function (err, dados) {
                if (err) {
                    req.flash('erro', 'Erro ao buscar usuários: ' + err);
                    res.redirect('/usuarios');
                } else {
                    res.render('usuarios/index', {lista: dados, title: 'Lista de Usuários'});
                }
            });
        },
        create: function (req, res) {
            res.render('usuarios/create', {user: new Usuario(), title: 'Cadastro de Usuários'});
        },
        post: function (req, res) {
            if (validacao(req, res)) {
                var model = new Usuario();
                model.nome = req.body.nome;
                model.email = req.body.email;
                model.site = req.body.site;
                model.senha = model.generateHash(req.body.senha);

                Usuario.findOne({'email': model.email}, function (err, data) {
                    if (data) {
                        req.flash('erro', 'E-mail já cadastrado, informe outro.');
                        res.render('usuarios/create', {user: model});
                    } else {
                        model.save(function (err) {
                            if (err) {
                                req.flash('erro', 'Erro ao cadastrar: ' + err);
                                res.render('usuarios/create', {user: req.body, title: 'Cadastro de Usuários'});
                            } else {
                                req.flash('info', 'Usuário: ' + req.body.nome + ', cadastrado com sucesso!');
                                res.redirect('/usuarios');
                            }
                        });
                    }
                });
            } else {
                res.render('usuarios/create', {user: req.body});
            }
        },
        show: function (req, res) {
            Usuario.findById(req.params.id, function (err, dados) {
                if (err) {
                    req.flash('erro', 'Erro ao visualizar usuário: ' + err);
                    res.redirect('/usuarios');
                } else {
                    res.render('usuarios/show', {dados: dados, title: 'Detalhes do Usuários'});
                }
            });
        },
        delete: function (req, res) {
            Usuario.remove({_id: req.params.id}, function (err) {
                if (err) {
                    req.flash('erro', 'Erro ao excluir usuário: ' + err);
                    res.redirect('/usuarios');
                } else {
                    req.flash('info', 'Usuário excluído com sucesso!');
                    res.redirect('/usuarios');
                }
            });
        },
        edit: function (req, res) {
            Usuario.findById(req.params.id, function (err, dados) {
                if (err) {
                    req.flash('erro', 'Erro ao visualizar usuário: ' + err);
                    res.redirect('/usuarios');
                } else {
                    res.render('usuarios/edit', {dados: dados, title: 'Detalhes do Usuários'});
                }
            });
        },
        update: function (req, res) {
            if (validacao(req, res)) {
                Usuario.findById(req.params.id, function (err, dados) {
                    var model = dados;
                    model.nome = req.body.nome;
                    model.sobrenome = req.body.sobrenome;

                    model.save(function (err) {
                        if (err) {
                            req.flash('erro', 'Erro ao atualizar usuário: ' + err);
                            res.render('/usuarios/edit', {dados: model});
                        } else {
                            req.flash('info', 'Usuário atualizado com sucesso!');
                            res.redirect('/usuarios');
                        }
                    });
                });
            } else {
                res.render('usuarios/edit', {dados: req.body});
            }
        }
    };
    return UsuariosController;
};