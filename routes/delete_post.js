var express = require('express');
var url = require('url');
var conn = require('../dbconnection')
var router = express.Router();
var loader = require('../modules_server')

router.get('/delete_post', function(req, res, next) {
    var idBaiViet = url.parse(req.url, true).query.id; 
    conn.connect((err)=>{
        if(req.session.daDangNhap){
            sess_user = {un:req.session.username};
            conn.connect((err)=>{
                loader.deletePost(conn, res, idBaiViet);
            });
        }
        else{
            req.session.back="/admin/post";
            res.redirect('/admin/login');
        }
    })
});

module.exports = router;