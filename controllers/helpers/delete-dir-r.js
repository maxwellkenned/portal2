/**
 * Recursively removes files/dir from a path. If an error happens, it
 * returns it with the callback.
 */
var deleteDirR = function(path, cb) {
    var fs = require('fs');
    var files = [];
    var curPath = '';

    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);

        files.forEach(function(file, index){
            curPath = path + '/' + file;

            if (fs.lstatSync(curPath).isDirectory())
                deleteDirR(curPath, cb);
            else
                fs.unlinkSync(curPath);
        });

        fs.rmdirSync(path);
        cb(null);
    } else {
        cb(new Error('The path passed does not exist.'));
    }
};

module.exports = deleteDirR;
