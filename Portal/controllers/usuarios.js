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
                 res.render('usuarios/index', {lista: dados, title: 'Lista de Usuários'});
                }
            });
        },
        create: function (req, res) {
            res.render('usuarios/create', {title: 'Cadastro de Usuários'});
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
                    res.render('usuarios/create', {user: req.body, title: 'Cadastro de Usuários'});
                } else {
                    req.flash('info', 'Registro cadastro com sucesso!');
                    res.redirect('/usuarios');
                }
            });
        },
        show: function (req, res) {
            Usuario.findById(req.params.id, function(err, dados){
                if(err){
                    req.flash('erro', 'Erro ao visualizar usuário: ' + err);
                    res.redirect('/usuarios');
                } else {
                    res.render('usuarios/show',{dados: dados, title: 'Detalhes do Usuários'});
                }
            });
        },
        delete: function (req, res) {
            Usuario.remove({_id: req.params.id}, function(err){
                if(err){
                    req.flash('erro', 'Erro ao excluir usuário: ' + err);
                    res.redirect('/usuarios'); 
                } else {
                    req.flash('info', 'Registro excluído com sucesso!');
                    res.redirect('/usuarios'); 
                }
            });
        }
    };
    return UsuariosController;
};