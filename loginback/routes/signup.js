var express = require('express');
var router = express.Router();
/* GET users listing. */
router.post('/add_user', function(req, res) {
   var data=req.body;
   firstname=data.firstname
   lastname=data.lastname
   username=data.username
   password=data.password
   var sqlquery="INSERT INTO user_register (firstName,lastName,userName,password) values('"+firstname+"','"+lastname+"','"+username+"','"+password+"')";
   req.app.locals.connection.query(sqlquery,function(error,results,fields){
      if(error) throw error;
      console.log(results)
      var output={status:parseInt(200),'statuscode':true,message:'ok',result:results}
      res.send(output);
   })
  });

  router.post('/login_user', function(req, res) {
   var data=req.body;
   username=data.username
   password=data.password
   var sqlquery="SELECT * FROM user_register where userName='"+username+"' and password='"+password+"'";
   req.app.locals.connection.query(sqlquery,function(error,results,fields){
      if(error) throw error;
      console.log(results)
      var output={status:parseInt(200),'statuscode':true,message:'ok',result:results}
      res.send(output);
   })
  });
  module.exports = router;