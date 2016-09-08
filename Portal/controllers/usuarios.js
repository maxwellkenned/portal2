var moment = require('moment');
module.exports = function (app) {
    'use strict';
    var Usuario = app.models.usuarios;

    var UsuariosController = {
        index: function (req, res) {
            Usuario.find(function(err, dados){
                if(err){
                    req.flash('erro', 'Erro ao buscar usuários: ' + err)
                    res.redirect('/usuarios');
                } else {
                 res.render('usuarios/index', {lista: dados, moment: moment});
                }
            });
        },
        create: function (req, res) {
            res.render('usuarios/create');
        },
        post: function (req, res) {
            var model = new Usuario();
            model.nome = req.body.nome;
            model.email = req.body.email;
            model.site = req.body.site;
            model.senha =  model.generateHash(req.body.senha);
            model.save(function(err){
                if(err){
                    req.flash('erro', 'Erro ao cadastrar: ' + err);
                    res.render('usuarios/create', {user: req.body});
                } else {
                    req.flash('info', 'Registro cadastro com sucesso!');
                    res.redirect('/usuarios');
                }
            })
        }
    };
    return UsuariosController;
};