var http = require('http'),
    server = http.createServer(function (req, res) {
        'use strict';
        res.writeHead(200, {'content-type': 'text/html;charset=utf-8'});
        res.write('<h1>Página Home</h1>');
        res.end();
    });
server.listen(3000, function () {
    'use strict';
    console.log('Rodando.');
});