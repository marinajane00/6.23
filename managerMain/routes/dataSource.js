var express = require('express');  
var getRouter = express.Router();
var postRouter = express.Router();
var fs = require('fs');
var async = require('async');
var db=require("../public/js/dbConnection.js");

getRouter.get('/dataSource', function (req, res) {  
	/*
   //【公司\用户管理】
   async.auto({
		connect:function(cb){
			//【远程连接】
			//db.connect("mysql","192.168.147.107","xz","000000xz","company","3306",function(e){
			db.connect("mysql","127.0.0.1","root","root","company","3308",function(e){
				cb(null,e);
			});
		},
		query:['connect',function(e,cb){
			db.queryDb("SELECT * FROM member",function(data){
				cb(null,data)
			})
		}]
	},function(err, results) {
		console.log('err = ', err);
		res.render('dataSource',{data:results.query});
	});
	*/
	res.render('dataSource');
});
    
postRouter.post('/dataSource', function(req, res) {
	/*
	//【键值对 添加一条新纪录】
	var temp="",
		str="'";
	for(var i in req.body){
		temp+=i+','
		str+=req.body[i]+"','"
	}
	temp=temp.substring(0,temp.length-1)
	str=str.substring(0,str.length-2)
	async.auto({
		connect:function(cb){
			//【远程连接】
			db.connect("mysql","127.0.0.1","root","root","company","3308",function(e){
				cb(null,e);
			});
		},
		query:['connect',function(e,cb){
			db.queryDb("insert into member("+temp+")values ("+str+")",function(data){
				cb(null,data)
			})
		}]
	},function(err, results) {
		console.log('err = ', err);
		console.log(results.query)
		res.render('dataSource',{data:results.query});
	});
	*/
	res.render('dataSource');
});
	
exports.get = getRouter;  
exports.post = postRouter;