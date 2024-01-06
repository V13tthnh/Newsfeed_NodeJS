var express = require('express');
var conn = require('../dbconnection')
var router = express.Router();
var loader = require('../modules_server')

/* GET login page. */
router.get('/register', function(req, res, next) {
    res.render('server/register');
});

router.post('/register', function(req, res, next) {
    let uname = req.body.fullname;
    let email = req.body.email;
    let pass = req.body.password;
    //module mã hóa mật khẩu
    const bcrypt = require('bcrypt');
    var salt = bcrypt.genSaltSync(10);
    var MatKhauMaHoa = bcrypt.hashSync(pass, salt);
    let user_info ={username:uname, password:MatKhauMaHoa, email:email, quyen:0, trangthai:1};
    conn.connect((err)=>{
        loader.Register(conn, res, user_info);
    })
});
module.exports = router;