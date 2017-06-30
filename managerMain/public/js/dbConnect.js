//+++++++++++++++++++++++++++++++++++++++++++++++++++++
//【数据库接入】
var mysql = require('mysql'),
	http = require('http');
	
var connectArry=[];
	
function connect(parm,sql,arr,callback){
	var handler={};
	handler["mysql"]=mysqlDb;
	handler["interface"]=inter;
	handler[parm.type](parm.ip,parm.user,parm.psw,parm.db,parm.port,sql,arr,callback);
}


//【mysql的连接池】
function mysqlDb(ip,user,psw,db,port,sql,arr,callback){
	var str=ip+user+psw+db+port+"";
	if(connectArry[str] == undefined){
		console.log("新连接")
		var pool=mysql.createPool({
				host: ip,
				user: user,
				password: psw,
				database: db,
				port: port,
				multipleStatements: true
			});
		pool.getConnection(function (err, connection){
			if(err) {
				console.log("连接池出错++++++++++++++++++++++++++++++++")
				pool.end(function (err) {});
				callback(null,err);
				return console.error(err);
			}
			connection.query(sql,arr, function (err,result){
				if (err) {
					callback(null,err);
					return console.error(err);
				}
				connection.release();
				connectArry[str]=connection;
				callback(result);
			});
		})
	}else{
		console.log("旧连接")
		connectArry[str].query(sql,arr, function (err,result){
			if (err) {
				callback(null,err);
				return console.error(err);
			}
			callback(result);
		});
	}
	console.log("连接数据库次数"+ connectArry.length);
	for(var i in connectArry){
		console.log(i)
	}
}

function inter(ip,user,psw,db,port,sql,arr,callback){
	http.get(
		ip,
		function(res){
			var data=[];
			res.on("data",function(chunk){
				data.push(chunk);
			});
			res.on('end', function() {
				callback(JSON.parse(data));
			});
	});
}

exports.connect = connect;