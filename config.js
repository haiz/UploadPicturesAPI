var path = require('path'),
    rootPath = path.normalize(__dirname);

var config = {  
  root: rootPath,
  app: {
    name: 'uploadpic-api'
  },
  port: 8081,
  db: 'mysql://root:1@localhost:3306/picture'
};

module.exports = config;
