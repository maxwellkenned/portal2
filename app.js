var express = require('express'),
    app = express(),
    load = require('express-load'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    flash = require('express-flash'),
    moment = require('moment'),
    expressValidator = require('express-validator'),
    multer = require('multer'),
    env = process.env.PORT || 8080,
    http = require('http').Server(app),
    io = require('socket.io')(http),
    mongoose = require('mongoose'),
    fs = require('fs'),
    promise = require('promise');


//conexão com o mongodb
mongoose.connect('mongodb://admin:82546459@ds019472.mlab.com:19472/portal', function (err) {
//var uri = 'mongodb://localhost:27017/portal';
//mongoose.connect(uri, function (err) {
    'use strict';
    if (err) {
        console.log("Erro ao conectar mongodb: " + err);
    } else {
        console.log('Mongodb Conectado');
    }
});
mongoose.set('debug',true);


//middleware
var erros = require('./middleware/erros');

app.set('io', io);
app.set('fs', fs);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({secret: 'portal', cookie:{maxAge: 10 * 60 * 1000}, resave: false, saveUninitialized: true}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(flash());

//HELPERS
app.use(function(req, res, next){
    'use strict';
    res.locals.session = req.session.usuario;
    app.set('user', req.session.usuario);
    res.locals.isLogged = req.session.usuario ? true : false;
    res.locals.moment = moment;
    next();
});

load('models')
    .then('controllers')
    .then('routes')
    .into(app);

//middleware
app.use(erros.notfound);
app.use(erros.serverError);

http.listen(env, function () {
    "use strict";
    console.log("Portal no ar." + "\nPorta: " + env);
});