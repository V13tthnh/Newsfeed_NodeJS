var express = require('express');
var router = express.Router();
var conn = require('../dbconnection')
var loader = require('../modules_client')


/* GET 404 page. */
router.get('/', function(req, res, next) {
  conn.connect((err)=>{
    loader.loadHead(conn, res, loader, '404.ejs');
  })
});

module.exports = router;