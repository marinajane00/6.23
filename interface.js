var express = require('express');
var http = require('http');
var _url = require('url');
var WebSocket = require('ws');
var async = require('async');
var db=require("./dbConnection.js");

var app = express();

app.use(function (req, res) {
  res.send({ msg: "interface" });
});

var server = http.createServer(app);
var wss = new WebSocket.Server({ server });

server.listen(7171, function listening() {
  console.log('Listening on %d', server.address().port);
});

wss.on('connection', function(ws, req){
	var query= _url.parse(req.url, true).query;
	//console.log(query)
	//【各个端初始接收数据】
	start(ws,query);
	
	//【接收设备信息】
	ws.on('message', function(message){
	   var temp=JSON.parse(message);
	   var handler={};
	   handler["deviceMsg"]=deviceMsg;
	   handler["receive"]=receive;
	   handler["changeTheme"]=changeTheme;
	   handler["activate"]=activate;
	   handler["controller"]=controller;
	   handler["order"]=order;
	   handler["ctrlToDevice"]=ctrlToDevice;
	   handler[temp.type](ws,temp.data || null);
	});
});
function start(ws,q){
	var handler={};
	handler["themeCtrl"]=themeCtrl;
	handler["client"]=client;
	handler["ctrl"]=ctrl;
	handler["orders"]=orders;
	handler["theme"]=theme;
	handler[q.type](ws,q)
}

var deviceData={};
function deviceMsg(ws,data){
	//【接收设备信息】
	deviceData[data.flag]=data.msg;
	
	/*
	wss.clients.forEach(function each(client) {
	  if (client !== ws ) {
		  console.log("这里广播")
		client.send(JSON.stringify({code:1000,type:"deviceMsg",data:data}));
	  }
	});
	*/
}
function ctrlToDevice(ws,data){
	wss.clients.forEach(function each(client) {
	  if (client !== ws ) {
		  console.log("这里广播")
		client.send(JSON.stringify({code:1000,type:"ctrlToDevice"}));
	  }
	});
}
function receive(ws,data){
	ws.send(JSON.stringify({code:1000,type:"deviceMsg",data:deviceData}));
	wss.clients.forEach(function each(client) {
	  if (client !== ws ) {
		  console.log("这里广播")
		client.send(JSON.stringify({code:1000,type:"receive"}));
	  }
	});
}

function changeTheme(ws,data){
	//【主题分配】
	var temp=data.val;
	if(temp){
		temp=temp.split(",")
	}else{
		temp=temp.split("")
	}
	if(data.types == "export"){
		db.connect("mysql","localhost","xz","000000xz","company","3306","SELECT themes FROM device WHERE  id='"+data.id+"'",function(bigData,connection){
			var themes=bigData[0].themes;
			if(themes){
				themes=themes.split(",")
			}else{
				themes=themes.split("")
			}
			for(var i=0; i<temp.length; i++){
				for(var x=0; x<themes.length; x++){
					if(themes[x] == temp[i]){
						themes.splice(x,temp.length)
					}
				}
			}
			connection.query("UPDATE device SET themes='"+themes.join(',')+"' WHERE id='"+data.id+"'", function (err,smallData){
				if (err) return console.error(err);
				if(smallData){
					wss.clients.forEach(function each(client) {
					  if (client !== ws ) {
						  console.log("这里广播")
						client.send(JSON.stringify({code:1000,type:"changeTheme",data:data}));
					  }
					});
				}
			});
		});
	}else if(data.types == "import"){
		console.log(data)
		db.connect("mysql","localhost","xz","000000xz","company","3306","SELECT themes FROM device WHERE  id='"+data.id+"'",function(bigData,connection){
			var themes=bigData[0].themes;
			if(themes){
				themes=themes.split(",")
			}else{
				themes=themes.split("")
			}
			var arr=themes.concat(temp).filter(function(val,index,self){
				return self.indexOf(val) == index
			})
			console.log(arr)
			connection.query("UPDATE device SET themes='"+arr.toString()+"' WHERE id='"+data.id+"'", function (err,smallData){
				if (err) return console.error(err);
				if(smallData){
					wss.clients.forEach(function each(client) {
					  if (client !== ws ) {
						  console.log("这里广播")
						client.send(JSON.stringify({code:1000,type:"changeTheme",data:data}));
					  }
					});
				}
			});
		});

	}
}
function controller(ws,data){
	//【返回控制台页面地址】
	console.log("控制器选择主题"+data)
	db.connect("mysql","localhost","xz","000000xz","company","3306","SELECT * FROM controller WHERE memberId='"+data.company+"' AND themeId='"+data.id+"'",function(data){
		ws.send(JSON.stringify({code:1000,type:"controller",data:data}));
	});
}
function order(ws,data){
	//【发送指令】
	console.log(data)
	wss.clients.forEach(function each(client) {
	  if (client !== ws ) {
		  console.log("这里广播")
		client.send(JSON.stringify({code:1000,type:"order",data:data}));
	  }
	});
}

function activate(ws,data){
	//【激活主题】
	console.log("当前激活主题："+data)
	wss.clients.forEach(function each(client) {
	  if (client !== ws ) {
		  console.log("这里广播")
		client.send(JSON.stringify({code:1000,type:"activate",data:data}))
	  }
	});
}
//———————————————————————————————————【各个端初始接收数据】

function theme(ws,q){
	//type=theme&company=1&theme=1
	async.auto({
		query:function(cb){
			//【某一主题下所有的数据列】
			db.connect("mysql","localhost","xz","000000xz","company","3306","SELECT * FROM db WHERE memberId='"+q.company+"' AND themeId='"+q.theme+"' AND onz='1'",function(data){
				cb(null,data)
			});
		},
		connection:['query',function(e,bigcb){
			var temp=[];
			var flag=-1;
			for(var i=0; i<e.query.length; i++){
				//【所有的数据列的数据】
				flag++;
				db.connect(e.query[flag].type,e.query[flag].ip,e.query[flag].user,e.query[flag].psw,e.query[flag].database,e.query[flag].port,"SELECT "+e.query[flag].field+" FROM "+e.query[flag].table,function(data){
					temp.push(data);
					if(temp.length>=e.query.length){
						bigcb(null,temp)
					}
					
				});
					
			}
		}]
	},function(err, results) {
		console.log('err = ', err);
		var result={};
		for(var i=0;i< results.query.length; i++){
			result[results.query[i].itemId]=results.connection[i]
		};
		ws.send(JSON.stringify(result));
		
	});
}

function themeCtrl(ws,q){
	//company=1&type=themeCtrl&ip=192.168.147.116
	async.auto({
		query:function(cb){
			//【当前设备...】
			db.connect("mysql","localhost","xz","000000xz","company","3306","SELECT * FROM device WHERE ip='"+q.ip+"' AND memberId='"+q.company+"'",function(data){
				cb(null,data)
			});
		},connection:['query',function(e,bigcb){
			//【查询分配主题】('1','2')
			var temp=e.query[0].themes.split(',').join("','")
			
			db.connect("mysql","localhost","xz","000000xz","company","3306","SELECT * FROM theme WHERE id in ('"+temp+"')", function (data){
				bigcb(null,data)
			});
		}]
	},function(err, results) {
		console.log('err = ', err);
		ws.send(JSON.stringify({code:1000,data:results.connection}));
	});
}
function client(ws,q){
	//company=1&type=client
	async.auto({
		query:function(cb){
			//【公司下所有设备】
			db.connect("mysql","localhost","xz","000000xz","company","3306","SELECT * FROM device WHERE memberId='"+q.company+"'",function(data){
				cb(null,data)
			});
		},connection:function(cb){
			//【公司下所有主题】
			db.connect("mysql","localhost","xz","000000xz","company","3306","SELECT * FROM theme WHERE memberId='"+q.company+"'",function(data){
				cb(null,data)
			});
		}
	},function(err, results) {
		console.log('err = ', err);
		ws.send(JSON.stringify({code:1000,data:{device:results.query,theme:results.connection}}));
	});
}
function ctrl(ws,q){
	//company=1&type=ctrl
	async.auto({
		query:function(cb){
			//【公司下所有设备】
			db.connect("mysql","localhost","xz","000000xz","company","3306","SELECT * FROM device WHERE memberId='"+q.company+"'",function(data){
				cb(null,data)
			});
		},connection:['query',function(e,bigcb){
			//【公司下所有主题】
			db.connect("mysql","localhost","xz","000000xz","company","3306","SELECT * FROM theme WHERE memberId='"+q.company+"'",function(data){
				bigcb(null,data)
			});
		}]
	},function(err, results) {
		console.log('err = ', err);
		ws.send(JSON.stringify({code:1000,data:{device:results.query,theme:results.connection}}));
	});
}
function orders(ws,q){
	//company=1&themeId=1&type=orders
	db.connect("mysql","localhost","xz","000000xz","company","3306","SELECT * FROM theme WHERE memberId='"+q.company+"' AND id='"+q.themeId+"'",function(data){
		
		console.log(data)
	});
}