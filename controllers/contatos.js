var validacao = require('../validations/contatos');

module.exports = function (app) {
    'use strict';

    var Contatos = app.models.contatos;

    var ContatoController = {
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
           if(validacao (req, res)){
                var model = new Contatos();
                model.nome = req.body.nome;
                model.email = req.body.email;

                Contatos.findOne({'email': model.email}, function (err, data) {
                    if (dados) {
                        req.flash('erro', 'E-mail já cadastrado, informe outro.');
                        res.render('contatos/create', {model: model});
                    }else{
                        req.flash('info', 'Contato cadastrado com sucesso!');
                        res.redirect('/contatos');
                    }
                })
           } else {
            res.render('amigos/create', {model: req.body});
           }
        },
        show: function (req, res){
            Contatos.findById(req.params.id, function (err, dados) {
                if(err){
                    req.flash('erro', 'Erro ao carregar: ' + err);
                    req.redirect('/contatos');
                } else{
                    res.render('contatos/show', {model: dados});
                }
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
                    res.render('contatos/update', {model: dados});
                }
            });
        }
    };

    return ContatoController;
};