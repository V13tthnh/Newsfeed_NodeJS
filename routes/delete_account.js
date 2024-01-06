var express = require('express');
var url = require('url');
var conn = require('../dbconnection')
var router = express.Router();
var loader = require('../modules_server')

router.get('/delete_account', function(req, res, next) {
    var idNguoiDung = url.parse(req.url, true).query.id; 
    conn.connect((err)=>{
        if(req.session.daDangNhap){
            sess_user = {un:req.session.username};
            conn.connect((err)=>{
                loader.deleteAccount(conn, res, idNguoiDung);
            });
        }
        else{
            req.session.back="/admin/Account";
            res.redirect('/admin/login');
        }
    })
});

module.exports = router;