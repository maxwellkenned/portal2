var express = require('express'),
    load = require('express-load'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    flash = require('express-flash'),
    moment = require('moment'),
    expressValidator = require('express-validator');

//conexão com o mongodb
//mongoose.connect('mongodb://localhost/portal', function (err) {
mongoose.connect('mongodb://admin:82546459@ds019472.mlab.com:19472/portal', function (err) {
    'use strict';
    if (err) {
        console.log("Erro ao conectar mongodb: " + err);
    } else {
        console.log('Mongodb Conectado');
    }
});

var app = express();

//middleware
var erros = require('./middleware/erros');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({secret: 'portal', resave: false, saveUninitialized: true}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(flash());

//HELPERS
app.use(function(req, res, next){
    'use strict';
    res.locals.moment= moment;
    next();
});

load('models')
    .then('controllers')
    .then('routes')
    .into(app);
//middleware
app.use(erros.notfound);
app.use(erros.serverError);

var env = process.env.PORT || 8080;

app.listen(env, function () {
    "use strict";
    console.log("Portal no ar." + "\nPorta: " + env);
});
