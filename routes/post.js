var express = require('express');
var conn = require('../dbconnection')
var router = express.Router();
var loader = require('../modules_server')

/* GET admin manage page. */
router.get('/post', function(req, res, next) {
    conn.connect((err)=>{
        if(req.session.daDangNhap){
            sess_user = {un:req.session.username};
            loader.loadHead(conn, res, loader, 'post.ejs', sess_user);
        }
        else{
            req.session.back="/admin/post";
            res.redirect('/admin/login');
        }
       
    })
});

module.exports = router;
