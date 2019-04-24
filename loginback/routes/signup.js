var express = require('express');
var router = express.Router();
/* GET users listing. */
router.post('/add_user', function(req, res) {
   console.log("Test");
   var data=req.body;
   res.send('data')
  });
  
  module.exports = router;