module.exports = function (app) {
	'use strict';
	var usuarios = app.controllers.usuarios;
	app.get('/usuarios', usuarios.index);
	app.get('/usuarios/create', usuarios.create);
}