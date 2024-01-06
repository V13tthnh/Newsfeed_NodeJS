var express = require('express');
var url = require('url');
var conn = require('../dbconnection')
var router = express.Router();
var loader = require('../modules_server')

router.get('/delete_category', function(req, res, next) {
    var idDanhMuc = url.parse(req.url, true).query.id; 
    if(req.session.daDangNhap){
        sess_user = {un:req.session.username};
        conn.connect((err)=>{
            loader.deleteCategory(conn, res, idDanhMuc);
        });
    }
    else{
        req.session.back="/admin/category";
        res.redirect('/admin/login');
    }
    
});

module.exports = router;