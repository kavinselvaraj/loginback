var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');
router.post('/addblog',function(req,res){
    var imageTypeRegularExpression = /\/(.*?)$/;
    function decodeBase64Image(dataString) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        var response = {};
        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }
        response.type = matches[1];
        response.data = new Buffer.from(matches[2], 'base64');
        return response;
    }
    if(req.body){
        var imageTypeDetected = decodeBase64Image(req.body.image).type.match(imageTypeRegularExpression);
        var base64Data = req.body.image.replace(/^data:image\/\w+;base64,/, '');
        let options = { width: 100, height: 100, responseType: 'base64' }
        try {
            var DateNow = Date.now();
            var imagePath = DateNow + '_' + req.body.title + '.' + imageTypeDetected[1];
            var location=path.join(__dirname,'../Uploads/Images/'+imagePath);
            fs.writeFile(location, base64Data, 'base64', function (err) {
                if (err) {
                    res.send({
                        status: false,
                        message: 'Mysql Error',
                        response: err
                    })
                }else {
                    var PhotoURL = "/Uploads/Images/" + imagePath;
                    var sqlquery="INSERT INTO add_blog (title,description,image_path) values('"+req.body.title+"','"+req.body.description+"','"+PhotoURL+"')";
                    req.app.locals.connection.query(sqlquery, function (err, result) {                               
                            if (err) {
                                res.send({
                                    status: false,
                                    message: 'Mysql Error',
                                    response: err,
                                })
                            } else {
                                res.send({
                                    status: true,
                                    message: 'ok',
                                    response: result
                                });
                            }
                    });
                } 
            })
        } catch (err) {
            console.error(err);
            res.send('output');
        }
    }
});

router.get('/fetchblog',function(req,res){
    var sqlquery="SELECT * FROM add_blog";
    req.app.locals.connection.query(sqlquery,function(error,results,fields){
       if(error) throw error;
       console.log(results)
       var output={status:parseInt(200),'statuscode':true,message:'ok',result:results}
       res.send(output);
    })
})
module.exports = router;