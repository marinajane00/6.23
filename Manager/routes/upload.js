var express = require('express');  
var getRouter = express.Router();
var postRouter = express.Router();
var fs = require('fs');

getRouter.get('/upload', function (req, res) {  
   res.render('upload');
});
postRouter.post('/upload', function(req, res) {
	var postData;
	req.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
    });
    req.addListener("end", function() {
		var temp=postData.split("text/html")[1].split("------")[0]
		
		fs.writeFile( '../test.html',temp, function(err){
			if (err) throw err;
			console.log('写入完成');
			//【上传主题包后返回主题包的id】
			
			//res.send({id:1})
			res.render('upload');
		});
    });
	
});
	
exports.post = postRouter;
exports.get = getRouter;