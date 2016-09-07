var express = require('express'),
    load = require('express-load'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session');

var app = express();

//middleware
var erros = require('./middleware/erros');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'portal'}));
app.use(express.static(path.join(__dirname, '/public')));

load('models')
    .then('controllers')
    .then('routes')
    .into(app);
//middleware
app.use(erros.notfound);
app.use(erros.serverError);

app.listen(3000, function () {
    'use strict';
    console.log('Express server listening on port 3000');
});