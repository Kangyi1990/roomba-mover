var express = require('express');
var router = express.Router();
var robotHelper=require('../helpers/robotHelper');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/', function(req, res, next) {
  var result=robotHelper.run(req.body.input);
  result.input=req.body.input;
  if(result.invalidInput){
    res.render('result',  result);
  }
  else{
    res.render('result', result);
  }
});

module.exports = router;
