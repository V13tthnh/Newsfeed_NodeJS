var express = require('express');
var conn = require('../dbconnection')
var router = express.Router();
var loader = require('../modules_server')

router.get('/add_account', function (req, res, next) {
    conn.connect((err) => {
        if (req.session.daDangNhap) {
            sess_user = { un: req.session.username };
            res.render('server/layout', { content: 'add_account.ejs', sess_user });
        }
        else {
            req.session.back = "/admin/account";
            res.redirect('/admin/login');
        }
    })
});

router.post('/add_account', (req, res, next) => {
    var ht = req.body.hoten;
    var mail = req.body.email;
    var mk = req.body.matkhau;
    var q = req.body.quyen;
    var tt = req.body.trangthai;
    const bcrypt = require('bcrypt');
    var salt = bcrypt.genSaltSync(10);
    var MatKhauMaHoa = bcrypt.hashSync(mk, salt);
    let user_info = { hoten: ht, email: mail, matkhau: MatKhauMaHoa, quyen: q, trangthai: tt };
    conn.connect((err) => {
        loader.addAccount(conn, res, user_info);
    });
})

module.exports = router;