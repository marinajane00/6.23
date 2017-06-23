var express = require('express');  
var getRouter = express.Router();
var postRouter = express.Router();
var async = require('async');
var _url = require('url');
var db=require("../public/js/dbConnection.js");

getRouter.get('/table', function (req, res) { 
	
	res.render('table')
});
postRouter.post('/table', function(req, res) {
	res.render('table')
});

exports.get = getRouter;
exports.post = postRouter;