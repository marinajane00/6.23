var express = require('express');  
var getRouter = express.Router();
var async = require('async');
var _url = require('url');
var db=require("../public/js/dbConnection.js");

getRouter.get('/admin', function (req, res) {  
	var queryUrl= _url.parse(req.url, true).query;
    async.auto({
		query:function(cb){
			//【某一主题下所有的数据列】
			db.connect("mysql","localhost","xz","000000xz","company","3308","SELECT * FROM db WHERE themeId='"+queryUrl.id+"'",function(data){
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
			result["id"+results.query[i].id]=results.connection[i]
		};
		res.render("admin",{data:result,db:results.query});
		
	});
});

exports.get = getRouter;