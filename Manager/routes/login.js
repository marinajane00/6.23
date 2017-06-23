var express = require('express');  
var getRouter = express.Router();  
var postRouter = express.Router();
var async = require('async');
var _url = require('url');
var db=require("../public/js/dbConnection.js");

getRouter.get('/login', function(req, res, next) {
	//【url传参】
	var query= _url.parse(req.url, true).query;
	console.log(query.type)
    res.render('login');
});

postRouter.post('/login', function(req, res) {
		//【公司及用户？？？】
		db.connect("mysql","localhost","root","root","company","3308","SELECT * FROM member WHERE name='"+req.body.username+"'",function(connected,data){
			connected.query("SELECT * FROM manager WHERE companyId='"+data[0].id+"'", function (err,d){
				console.log("登录请求成功")
				console.log(d)
			});
		});
		
		if(true) {
			res.cookie('authorized', req.body.username);
			res.render('index');
		}
		else{
			res.render('login');
		}
    
})
	
exports.get = getRouter;  
exports.post = postRouter;