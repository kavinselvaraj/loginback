var express = require('express');
var router = express.Router();
/* GET users listing. */
router.post('/add_user', function(req, res) {
   var data=req.body;
   
   firstname=data.firstname
   lastname=data.lastname
   username=data.username
   password=data.password

   console.log(data.firstname)
   var sqlquery="INSERT INTO user_register (firstName,lastName,userName,password) values('"+firstname+"','"+lastname+"','"+username+"','"+password+"')";
  
   req.app.locals.connection.query(sqlquery,function(error,results,fields){
      if(error) throw error;
      var output={status:parseInt(200),'statuscode':true,message:'Successfully Inserted'}
      res.send(output);
   })
  
  });
  
  module.exports = router;