var fs = require('fs');
var util = require('util')
module.exports = function (app) {
    'use strict';
    var Usuario = app.models.usuarios;
    var chatCtrl = app.controllers.chatInit;
    var validacao = require('../validations/autentication');
    var validCadastro = require ('../validations/usuarios');
    var Chat = app.models.chat;
    var io = app.get('io');
    var Arquivo = app.models.arquivo;

    var HomeController = {
        index: function (req, res) {
            chatCtrl;
            res.render('home/index');
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
                        req.flash('info', 'Bem vindo ao Ceu.Cloud!');
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
        // Função Registrar chamada pelo metodo GET na rota usuarios.
        registrar: function (req, res) {
            res.render('home/register', {user: new Usuario(), title: 'Portal Share || Criar conta'});
        },
        // Função Registro chamada pelo metodo POST na rota usuarios.
        registro: function (req, res) {
            // Primeiro verifica se as informações estão OKs e depois adiciona as informações a uma variavel com o modelo do banco de dados.
            if (validCadastro(req, res)) {
                // Cria uma variavel com o modelo do banco de dados Usuario e Recebe as informações da pagina;
                var model = new Usuario();
                model.nome = req.body.nome;
                model.sobrenome = req.body.sobrenome;
                model.email = req.body.email;
                model.senha = model.generateHash(req.body.senha);
                // Verifica se o email já se encontra cadastrado. Se já estiver informa ao usuario, caso não esteja ele realiza o cadastro.
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
                                criarPasta();
                            }
                        });
                    }
                });
            } else {
                res.render('home/register', {user: req.body});
            }
        }
    }
    // Retorna a variavel do controllador.
    return HomeController;
    // Criar a Pasta do usuario para Upload. Verifica se já existe, se não existir ele cria.
    var criarPasta = function(){
    var user = app.get('user');
    var dir = 'public/uploads/'; // give path
    var files = dir + user._id +'/';
        fs.exists(dir, (exists) => {
         if(!exists){
            fs.mkdir(dir, function(args){
               console.log('Pasta: '+dir+' criado com sucesso!');
            });
         }
        });
        fs.exists(files, (exists) => {
            if(!exists){
                fs.mkdir(files, function(args){
                   console.log('Pasta: '+files+' criado com sucesso!');
                });
            }
        });
    };
};