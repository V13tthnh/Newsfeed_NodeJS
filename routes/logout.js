var express = require('express');
var conn = require('../dbconnection')
var router = express.Router();
var loader = require('../modules_server')

/* GET logout admin page. */
router.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.redirect("/admin/login");
});

module.exports = router;