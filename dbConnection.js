//【数据库接入】
var mysql = require('mysql');
	http = require('http'),
	times=0;

function connect(type,ip,user,psw,db,port,sql,callback){
	var handler={};
	handler["mysql"]=mysqlDb;
	handler["interface"]=inter;
	handler[type](ip,user,psw,db,port,sql,callback);
	console.log("访问次数"+ times++);
	console.log(sql)
}
//【不同的数据库类型连接】
function mysqlDb(ip,user,psw,db,port,sql,callback){
	//【mysql的连接池】
	var pool=mysql.createPool({
			host: ip,
			user: user,
			password: psw,
			database: db,
			port: port
		});
	pool.getConnection(function (err, connection){
		if(err)console.log(err);//pool.end(function (err) {});
		connection.query(sql, function (err,data){
			//console.log(data)
			connection.release();

            if (err) {
                return console.error(err);
            }
			callback(data,connection);
		});
	})
}
function inter(ip,user,psw,db,port,sql,callback){
	http.get(
		ip,
		function(res){
			var data=[];
			console.log(sql)
			res.on("data",function(chunk){
				data.push(chunk);
			});
			res.on('end', function() {
				console.log(JSON.parse(data))
				callback(JSON.parse(data));
			});
	});
}
exports.connect=connect;