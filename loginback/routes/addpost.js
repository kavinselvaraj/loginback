var express = require('express');
var router = express.Router();
var path = require('path');
router.post('/addblog',function(req,res){
    var imageTypeRegularExpression = /\/(.*?)$/;
    console.log(req.body)
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
        console.log(imageTypeDetected);
        var base64Data = req.body.image.replace(/^data:image\/\w+;base64,/, '');
        let options = { width: 100, height: 100, responseType: 'base64' }
        try {
            var DateNow = Date.now();
            var imagePath = DateNow + '_' + req.body.title + '.' + imageTypeDetected[1];
            console.log(location);
            console.log(imagePath);
            var location=path.join(__dirname,'../Uploads/Images/'+imagePath);
            
            fs.writeFile(location, base64Data, 'base64', function (err) {

                if (err) {
                    res.send({
                        status: false,
                        message: 'Mysql Error',
                        response: err
                    })
                } else {
                    res.send({
                        status: false,
                        message: 'Image upload',
                        response: err
                    })
                    // var PhotoURL = "/Uploads/Member/" + imagePath;
                    // var thumbLink = " ";
                    // var userID = 1;
                    // var fileLength = 1;
                    // var mimeType = "." + imageTypeDetected[1];

                    // connection.query('call gym_gymMember_save(' + req.body.MemberID + ',"' + req.body.firstName + '","' + req.body.lastName + '","' + req.body.address + '","' + req.body.phone + '","' + req.body.mailID + '",' + req.body.age + ',"' + req.body.bloodGroup + '","' + req.body.dob + '","' + PhotoURL + '",' + req.body.height + ',' + req.body.weight + ',"' + req.body.bmi + '",' + req.body.Gender + ',' + userID + ',1,'+req.body.gymID+');', function (err, result) {

                    //     if (err) {

                    //         res.send({
                    //             status: false,
                    //             message: 'Mysql Error',
                    //             response: err,
                    //         })
                    //     } else {
                    //         console.log(result);
                    //         res.send({
                    //             status: true,
                    //             message: 'Save Successfully',
                    //             response: result
                    //         });
                    //     }

                    // });
                }
            })


        } catch (err) {
            console.error(err);
        }
    }
    
});
module.exports = router;