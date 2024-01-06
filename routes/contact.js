var express = require('express');
var router = express.Router();
var conn = require('../dbconnection')
var loader = require('../modules_client')


/* GET contact page. */
router.get('/', function(req, res, next) {
  conn.connect((err)=>{
    loader.loadHead(conn, res, loader, 'contact.ejs');
  })
});

router.post('/', function(req, res, next){
  var ct_name  = req.body.ct_name;
  var ct_email = req.body.ct_email;
  var ct_message = req.body.ct_message;
  conn.connect((err)=>{
    loader.InsertContact(conn, res, 'contact.ejs', ct_name, ct_email, ct_message);
  })
})

module.exports = router;
