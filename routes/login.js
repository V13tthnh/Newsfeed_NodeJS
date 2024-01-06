var express = require('express');
var conn = require('../dbconnection')
var router = express.Router();
var loader = require('../modules_server')

/* GET login page. */
router.get('/login', function(req, res, next) {
    res.render('server/login.ejs');
});

router.post('/login', (req, res, next)=>{
    let email = req.body.u_email;
    let password = req.body.u_pass;
    conn.connect((err)=>{
        loader.LoginToAdminPage(conn, req, res, email, password);
    })
})

module.exports = router;