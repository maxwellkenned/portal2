angular.module('portal').controller('UsuariosController', function ($scope, $resource){
    'use strict';
    $scope.usuarios = [];
    $scope.filtro = '';

    var Usuario = $resource('/usuarios');
    var promise = Contato.query().$promise;

    function buscaUsuarios(){
        Usuario.query( function (usuarios) {
            $scope.usuarios = usuarios;
        }, function (erro) {
            console.log("Não foi possivel obter a lista de contatos.");
            console.log(erro);
        });
    }
    buscaUsuarios();
});