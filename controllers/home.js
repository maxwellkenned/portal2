module.exports = function (app) {
    'use strict';
    var Usuario = app.models.usuarios;
    var chatController = app.controllers.chat;
    var validacao = require('../validations/autentication');
    var validCadastro = require ('../validations/usuarios');

    var HomeController = {
        index: function (req, res) {
            var params = {title: 'Portal Share'};
            chatController;
            res.render('home/index', params);
        },
        login: function (req, res) {
            res.render('home/login', {title: 'Ceu.Cloud | Login'});
        },
        autentication: function (req, res) {
            var usuario = new Usuario();
            var email = req.body.email;
            var senha = req.body.senha;

            if (validacao(req, res)) {
                Usuario.findOne({'email': email}, function (err, data) {
                    if (err) {
                        req.flash('erro', 'Erro ao acessar o sistema: ' + err);
                        res.redirect('/');
                    } else if ((!data) || (!usuario.validaSenha(senha, data.senha))) {
                        req.flash('erro', 'E-mail ou senha inválida!');
                        res.redirect('/');
                    } else {
                        req.flash('info', 'Bem vindo ao Portal Share!');
                        req.session.usuario = data;
                        res.redirect('/home');
                    }
                });
            } else {
                res.redirect('/');
            }
        },
        logout: function (req, res) {
            req.session.destroy();
            res.redirect('/');
        },
        registrar: function (req, res) {
            res.render('home/register', {user: new Usuario(), title: 'Portal Share || Criar conta'});
        },
        registro: function (req, res) {
            if (validCadastro(req, res)) {
                var model = new Usuario();
                model.nome = req.body.nome;
                model.sobrenome = req.body.sobrenome;
                model.email = req.body.email;
                model.senha = model.generateHash(req.body.senha);

                Usuario.findOne({'email': model.email}, function (err, data) {
                    if (data) {
                        req.flash('erro', 'E-mail já cadastrado, informe outro.');
                        res.render('home/register', {user: model});
                    } else {
                        model.save(function (err) {
                            if (err) {
                                req.flash('erro', 'Erro ao cadastrar: ' + err);
                                res.render('home/register', {user: req.body, title: 'Cadastro de Usuários'});
                            } else {
                                req.flash('info', 'Cadastrado com sucesso!');
                                res.redirect('/');
                            }
                        });
                    }
                });
            } else {
                res.render('home/register', {user: req.body});
            }
        }
    };
    return HomeController;
};