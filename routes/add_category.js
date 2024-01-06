var express = require('express');
var conn = require('../dbconnection')
var router = express.Router();
var loader = require('../modules_server')

router.get('/add_category', function(req, res, next) {
    conn.connect((err)=>{
        if(req.session.daDangNhap){
            sess_user = {un:req.session.username};
            res.render('server/layout',{content: 'add_category.ejs', sess_user});
        }
        else{
            req.session.back="/admin/category";
            res.redirect('/admin/login');
        }
    })
});

router.post('/add_category', (req, res, next)=>{
    var tendanhmuc = req.body.category_name;
    conn.connect((err)=>{
        loader.addCategory(conn, res, tendanhmuc);
    });
})

module.exports = router;