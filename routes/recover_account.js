var express = require('express');
var conn = require('../dbconnection')
var router = express.Router();
var loader = require('../modules_server')


/* GET login page. */
router.get('/recover_account', function(req, res, next) {
    res.render('server/recover_account.ejs');
});

router.post('/recover_account', (req, res, next)=>{
    let email = req.body.email;
    conn.connect((err)=>{
        loader.resetAccount(conn, res, email);
    })
})

module.exports = router;