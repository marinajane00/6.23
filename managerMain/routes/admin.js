var express = require('express');  
var getRouter = express.Router();
var async = require('async');
var _url = require('url');
//var db=require("../public/js/dbConnection.js");
var db=require("../public/js/dbConnect.js");

function erro(err,str){
	if (err) {
		console.log(str)
		return console.error(err);
	}
}
function erro(err,str){
	if (err) {
		console.log(str)
		return console.error(err);
	}
}
getRouter.get('/admin', function (req, res) {  
	var query= _url.parse(req.url, true).query;
    //【获取到url参数后查询数据库将数据传输】
	
var local={type:"mysql",ip:"localhost",user:"xz",psw:"000000xz",db:"company",port:"3306"}

	//【获取到url参数后查询数据库将数据传输】
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
		res.render("admin",{data:result,db:results.query1,total:total});
	});	
});

exports.get = getRouter;