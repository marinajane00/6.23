var http = require('http');  
var url = require('url');  
var util = require('util');  
  
http.createServer(function(req,res){  
	console.log('Listening on %d',8888);
	console.log([{name:"yes"}])
    res.writeHead(200,{'Content-Type':'text/plain'});  
    //res.end(util.inspect(url.parse(req.url,true)));  
	res.end(JSON.stringify([{name:"yes"}]))
}).listen(8888); 