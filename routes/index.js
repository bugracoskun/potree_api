var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send({
    status:true,
    message: 'Welcome to API',
    version:'1.0.1'
  });
});


router.post('/addfile', function(req, res, next) {
  console.log("post isteği geldi");
  var obj={
    id: req.body.id,
    file: req.body.file,
    name: req.body.name
  };
  req.app.locals.BC.addfile(obj,function(result){
    if(result.status){
      res.status(200).send({status:true,message:result.message,data:result.data});
    }else{
      res.status(400).send({status:false,message:error})
    }
  })
});


module.exports = router;