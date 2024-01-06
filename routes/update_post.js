var express = require('express');
var conn = require('../dbconnection')
var router = express.Router();
var url = require('url');
var loader = require('../modules_server')

router.get('/update_post', function(req, res, next) {
    conn.connect((err)=>{
        if(req.session.daDangNhap){
            sess_user = {un:req.session.username};
            var id = url.parse(req.url, true).query.id;
            loader.getPostByID(conn, res, 'update_post.ejs', id, sess_user);
        }
        else{
            req.session.back="/admin/update_post";
            res.redirect('/admin/login');
        }
    })
});

router.post('/update_post', (req, res, next)=>{
    let td = req.body.tieude;
    let img = 'images/' + req.body.anh;
    let nd = req.body.noidung;
    let ndg = req.body.ngaydang;
    let tg = req.body.tacgia;
    let iddm = req.body.idDanhMuc;
    let tt = req.body.trangthai;
    let idBaiViet = url.parse(req.url, true).query.id;
    let post_info ={tieude:td, anh:img, noidung:nd, ngaydang:ndg, tacgia:tg, iddanhmuc: iddm, trangthai: tt};
    conn.connect((err)=>{
        loader.updatePost(conn, res, post_info, idBaiViet);
    });
})

module.exports = router;