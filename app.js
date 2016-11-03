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
    passport = require('passport'),
    s3fs = require('s3fs'),
    multer = require('multer'),
    env = process.env.PORT || 8080,
    http = require('http').Server(app),
    io = require('socket.io')(http),
    mongoose = require('mongoose'),
    fs = require('fs'),
    formidable = require('formidable');


//conexão com o mongodb
mongoose.connect('mongodb://admin:82546459@ds019472.mlab.com:19472/portal', function (err) {
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
app.set('formidable', formidable)

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
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '/public')));
app.use(flash());

//HELPERS
app.use(function(req, res, next){
    'use strict';
    res.locals.session = req.session.usuario;
    app.set('user', req.session.usuario);
    res.locals.isLogged = req.session.usuario ? true : false;
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

http.listen(env, function () {
    "use strict";
    console.log("Portal no ar." + "\nPorta: " + env);
});