var express = require('express');
var conn = require('../dbconnection')
var router = express.Router();
var loader = require('../modules_server')

/* GET admin manage page. */
router.get('/account', function(req, res, next) {
    conn.connect((err)=>{
        if(req.session.daDangNhap){
            sess_user = {un:req.session.username};
            loader.loadHead(conn, res, loader, 'account.ejs', sess_user);
        }
        else{
            req.session.back="/admin/account"; //ghi vào session địa chỉ của trang hiện hành
            res.redirect('/admin/login');
        }
       
    })
});

module.exports = router;
