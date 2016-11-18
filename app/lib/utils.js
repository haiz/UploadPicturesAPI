module.exports = function(config) {

    var fs = require('fs');
    //var bcrypt = {};
    var jwt = require('jsonwebtoken');
    var obj = {};

    obj.tokenKey = 'SuperSecretKey';
    obj.tokenGen = jwt;
    obj.checkToken = function(req, res, next) {
        console.log("ASDASD: " + obj.tokenKey);
        if (req.headers.token) {
            jwt.verify(req.headers.token, obj.tokenKey, function(err, user) {
                if (user) {
                    console.log('There is an user');
                    req.user = user;
                    next();
                } else {
                    if (err && err.name == 'TokenExpiredError')
                        res.status(400).json({
                            status: "400 bad request",
                            message: "Your token has expired"
                        })
                    else
                        res.status(400).json({
                            status: "400 bad request",
                            message: "You have an invalid token, probably someone has tried to modify it"
                        });
                }
            });
        } else {
            req.user = null;
            next();
        }
    }

    obj.encrypt = function(plainText, done) {
        // bcrypt.hash(plainText, 10, function(error, encrypted) {
        //     done(encrypted);
        // });
        done(plainText);
    }

    obj.compare = function(pass, hash, done) {
        // bcrypt.compare(pass, hash, function(err, res) {
        //     return done(err, res);
        // });
        done(false, pass==hash);
    }


    obj.getModelNames = function() {
        var names = [];
        var modelsPath = config.root + '/app/models';
        fs.readdirSync(modelsPath).forEach(function(file) {
            names.push(file.replace('.js', ''));
        });
        return names;
    }

    obj.loadModels = function(mongoose) {
        // config mongoose models
        var models = {};
        var modelsPath = config.root + '/app/models';
        fs.readdirSync(modelsPath).forEach(function(file) {
            if (file.indexOf('.js') >= 0) {
                models[file.replace('.js', '')] = require(modelsPath + '/' + file)(mongoose);
                console.log('Loaded: ' + file.replace('.js', '') + ' model.');
            }
        })
        return models;
    }

    obj.loadControllers = function(models) {
        var ctrls = {};
        var ctrlsPath = config.root + '/app/controllers';
        fs.readdirSync(ctrlsPath).forEach(function(file) {
            if (file.indexOf('.js') >= 0) {
                ctrls[file.replace('.js', '')] = require(ctrlsPath + '/' + file)(models[file.replace('.js', '')], obj);
                console.log('Loaded: ' + file.replace('.js', '') + ' controllers.');
            }
        })
        return ctrls;
    }

    return obj;

}
