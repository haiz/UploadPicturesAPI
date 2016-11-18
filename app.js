var config = require('./config');
var Sequelize = require('sequelize');
var express = require('express');
var utils = require('./app/lib/utils')(config);
var bodyParser  = require('body-parser');

var app = express();

//load models
var models = {};
var sequelize = new Sequelize(config.db, {});
models = utils.loadModels(sequelize);

app.use(express.multipart());
app.use(bodyParser.json());         
app.use(bodyParser.urlencoded({     
    extended: true                  
}));

//CORS support
app.all('*', function (req, res, next) {
    if (!req.get('Origin')) return next();
    // use "*" here to accept any origin
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, token');
    res.set('Access-Control-Allow-Credentials', 'true');
    // res.set('Access-Control-Allow-Max-Age', 3600);
    if ('OPTIONS' == req.method) return res.send(200);
    next();
});

//define routes
require('./routes')(app, utils, models);

app.listen(config.port, function () {
	console.log('API is listening on port ', config.port);
});

