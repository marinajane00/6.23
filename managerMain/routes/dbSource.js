//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const http = require('http'),
    io = require('socket.io'),
	async = require('async');

var db=require("../public/js/dbConnect.js");
//创建server
var server = http.createServer(function(req, res){ 
  // Send HTML headers and message
  res.writeHead(200,{ 'Content-Type': 'text/html' }); 
  res.end('<h1>Hello Socket Lover!</h1>');
});
var i=0;
//端口8000
server.listen(8071);

function dbSource(){
var main = io.listen(server);

main.sockets.on('connection', function(socket) {
	const query=socket.handshake.query;
	console.log("请求次数"+i)
	init(query,socket);
	//广播
	socket.on("client",function(e){
		socket.broadcast.emit("clientServer",e)
	});
	i++;
});
}
function erro(err,str){
	if (err) {
		console.log(str)
		return console.error(err);
	}
}
var local={type:"mysql",ip:"localhost",user:"xz",psw:"000000xz",db:"company",port:"3306"}

//【获取到url参数后查询数据库传输初始数据】
function init(query,socket){
	//【主题及主题模块】
	db.connect(local,"SELECT * FROM theme WHERE memberId=?",[query.id],function(themes){
		if(themes){
			var themesCount=-1;
			var itemStep=0;
			var arr=[];
			for(var i=0; i<themes.length; i++){
				arr[themes[i].name]={};
				db.connect(local,"SELECT DISTINCT itemId FROM db WHERE memberId = ? && themeId =?;",[query.id,themes[i].id],function(item){
					themesCount++;
					itemStep+=item.length;
					if(item){
						var itemCount=0;
						var again;
						for(var j=0; j<item.length; j++){
							again=themesCount;
							db.connect(local,"SELECT * FROM db WHERE itemId = ? && memberId = ? && themeId =?;",[item[j].itemId,query.id,themes[themesCount].id],function(itemSource){
								if(itemSource){
									arr[themes[again].name][item[itemCount].itemId]=itemSource
									itemCount++;
									if(Object.getOwnPropertyNames(arr).length>=itemStep){
										console.log(arr)
										socket.emit("theme",arr)
									}
								}else{
									erro(data,"查询数据源中主题对应模块出错++++")
								}
							});
						}
					}else{
						erro(data,"查询数据源中主题对应模块出错++++")
					}
				});
			}
		}else{
			erro(data,"查询公司主题出错++++")
		}
	});
	/*
	//【数据源总页数及第一页数据源信息】
	source(1,socket)
	async.auto({
		query1:function(cb){
			db.connect(local,"SELECT * FROM db WHERE memberId=?",[query.id],function(data1){
				if(data1){
					db.connect(local,"SELECT id,name FROM theme WHERE memberId=?",[query.id],function(data2){
						if(data2){
							cb(null,{db:data1,theme:data2})
						}else{
							erro(data2,"查询公司主题出错++++++++++++++++++++++++++++++++")
						}
					});
				}else{
					erro(data1,"查询公司数据源出错++++++++++++++++++++++++++++++++")
				}
			});
		},
		query2:['query1',function(sync,cb){
			var temp=[];
			var flag=-1;
			for(var i=0; i<sync.query1.db.length; i++){
				//【所有的数据列的数据】
				flag++;
				db.connect(
				{type:sync.query1.db[flag].type,ip:sync.query1.db[flag].ip,user:sync.query1.db[flag].user,psw:sync.query1.db[flag].psw,db:sync.query1.db[flag].database,port:sync.query1.db[flag].port},
				"SELECT ?? FROM ??",[sync.query1.db[flag].field.split(","),sync.query1.db[flag].table],
				function(data){
					if(data){
						temp.push(data)
						if(temp.length>=sync.query1.db.length){
							cb(null,temp)
						}
					}else{
						erro(data,"查询主题数据出错++++++++++++++++++++++++++++++++")
					}
				});
					
			}
		}]
	},function(err, results) {
		erro(err,"async连接出错")
		
		var result={},
			total={
				data:{},
				db:0
			};
		for(var i=0;i< results.query1.db.length; i++){
			result[results.query1.db[i].name]=results.query2[i]
			total.data[results.query1.db[i].name]=Math.ceil(result[results.query1.db[i].name].length/10);
		};
		total.db=Math.ceil(results.query1.db.length/10)
		console.log(total);
		results.query1.db.slice(0,10)
		socket.emit("source",{data:result,db:results.query1,total:total})
	});	
	*/
}

//【数据源总页数及分页数据】
function source(current,socket){
	db.connect(local,"SELECT * from db LIMIT "+(current-1)*10+","+current*10,[],function(data){
		if(data){
			socket.emit("source",data)
		}else{
			erro(data,"数据源查询出错")
		}
	});
}
//【模块对应的数据源】
function itemSource(item,socket){
	db.connect(local,"SELECT * from db LIMIT "+(current-1)*10+","+current*10,[],function(data){
		if(data){
			socket.emit("source",data)
		}else{
			erro(data,"数据源查询出错")
		}
	});
}
exports.dbSource = dbSource;