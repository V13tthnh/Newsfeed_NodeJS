var express = require('express');
var conn = require('../dbconnection')
var url = require('url');
var router = express.Router();
var loader = require('../modules_server')

router.get('/update_account', function(req, res, next) {
    conn.connect((err)=>{
        if(req.session.daDangNhap){
            sess_user = {un:req.session.username};
            var id = url.parse(req.url, true).query.id;
            loader.getAccountByID(conn, res, 'update_account.ejs', id, sess_user);
        }
        else{
            req.session.back="/admin/update_account";
            res.redirect('/admin/login');
        }
    })
});

router.post('/update_account', (req, res, next)=>{
    let idNguoiDung = url.parse(req.url, true).query.id;
    var ht = req.body.hoten;
    var mail = req.body.email;
    var mk = req.body.matkhau;
    var q = req.body.quyen;
    var tt = req.body.trangthai;
    const bcrypt = require('bcrypt');
    var salt = bcrypt.genSaltSync(10);
    var MatKhauMaHoa = bcrypt.hashSync(mk, salt);
    let user_info ={hoten:ht, email:mail, matkhau:MatKhauMaHoa, quyen:q, trangthai:tt};
    conn.connect((err)=>{
        loader.updateAccount(conn, res, user_info, idNguoiDung);
    });
})

module.exports = router;