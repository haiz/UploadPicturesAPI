var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static');

var serve = serveStatic('uploads');

var port = 4000;
var server = http.createServer((req,res)=>{
	serve(req,res,finalhandler(req,res));
	console.log("Storage is serving at localhost:"+ port);
})

server.listen(port);