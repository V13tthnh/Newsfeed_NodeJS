var express = require('express');
var conn = require('../dbconnection')
var router = express.Router();
var loader = require('../modules_client')

/* GET home page. */
router.get('/', function(req, res, next) {
    conn.connect((err)=>{
        loader.loadHead(conn, res, loader, 'index.ejs');
    })
});

module.exports = router;
