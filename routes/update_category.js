var express = require('express');
var conn = require('../dbconnection')
var url = require('url');
var router = express.Router();
var loader = require('../modules_server')

router.get('/update_category', function(req, res, next) {
    conn.connect((err)=>{
        if(req.session.daDangNhap){
            sess_user = {un:req.session.username};
            var id = url.parse(req.url, true).query.id;
            loader.getCategoryByID(conn, res, 'update_category.ejs', id, sess_user);
        }
        else{
            req.session.back="/admin/update_category";
            res.redirect('/admin/login');
        }
    })
});

router.post('/update_category', (req, res, next)=>{
    var tendanhmuc = req.body.category_name;
    var id = url.parse(req.url, true).query.id;
    conn.connect((err)=>{
        loader.updateCategory(conn, res, tendanhmuc, id);
    });
})

module.exports = router;