var express = require('express');
var url = require('url');
var router = express.Router();
var conn = require('../dbconnection')
var loader = require('../modules_client')


/* GET detail page. */
router.get('/', function(req, res, next) {
  let id = url.parse(req.url, true).query.id;
  console.log(id);
  conn.connect((err)=>{
    loader.loadDetailByID(conn, res, loader, 'detail.ejs', id);
  })
});

module.exports = router;
