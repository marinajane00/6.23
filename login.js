var express = require('express');
var http = require('http');
var _url = require('url');
var WebSocket = require('ws');
var async = require('async');
var crypto=require('crypto');
var db=require("./dbConnection.js");

var app = express();

app.use(function (req, res) {
  res.send({ msg: "interface" });
});

var server = http.createServer(app);
var wss = new WebSocket.Server({ server });

server.listen(7676, function listening() {
  console.log('Listening on %d', server.address().port);
});

wss.on('connection', function(ws, req){
	var query= _url.parse(req.url, true).query;
	console.log(query)
	manager(ws,query);
});
    
function manager(ws,query){
	var handler={};
	handler["login"]=login;
	handler[query.type](ws,query)
}

function md5 (text) {
    return crypto.createHash('md5').update(text).digest('hex');
};

function login(ws,q){
	//type=login&flag=0&company=1&user=admin&psw=111
	async.auto({
		query:function(cb){
			//【查询用户】
			db.connect("mysql","localhost","xz","000000xz","company","3308","SELECT * FROM member WHERE name='"+q.company+"'",function(data){
				cb(null,data)
			});
		},connection:['query',function(e,bigcb){
			if(e.query.length !=0){
			db.connect("mysql","localhost","xz","000000xz","company","3308","SELECT * FROM manager WHERE companyId='"+e.query[0].id+"' AND name='"+q.user+"' AND psw='"+q.psw+"'",function(data){
				bigcb(null,data)
			});
			}else{
				bigcb(null,null)
			}
		}]
	},function(err, results) {
		if(results.connection){
			ws.send(JSON.stringify({code:1000,data:results.query[0].id}))
		}else{
			ws.send(JSON.stringify({code:1005}))
		}
	});
}

//————————————————————————————————————————————————————【以上是登录接口】