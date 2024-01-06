//Kiểm tra đăng nhập vào trang admin
exports.LoginToAdminPage = (con, req, res, email, password)=>{
    if(email && password){
        con.query("Select * from NguoiDung where Email = '"+email+"'", (err, result)=>{
            if (err) throw err;
            if(result.length <= 0){
                res.redirect('/admin/login');
                return;
            }
            let user = result[0];
            let pass = user.MatKhau;
            const bcrypt = require("bcrypt");        
            var kq = bcrypt.compareSync(password, pass); //so sánh mật khẩu nhập và mật khẩu đã mã hóa
            if (kq){ 
                console.log("Login Successfully!");
                var sess = req.session;
                sess.daDangNhap = true; //Kiểm tra đăng nhập
                sess.username = user.TenNguoiDung; //Lưu tên người dùng
                //nếu thấy địa chỉ trang cũ đã lưu ngoài routes chức năng, thì quay lại trang cũ đã lưu đó                    
                if (sess.back){ 
                    res.redirect(sess.back);
                }
                else {
                    res.redirect("/admin/account");
                }
            }   
            else {
                console.log("Login Failed!"); 
                res.redirect('/admin/login');
            }
        })
    }
}

exports.loadHead = (con, res, loader, content, sess_user)=>{
    var data = {} ;
    console.log(data);
    loader.GetPost(data, con, res, loader, content, sess_user);
}

exports.GetPost = (data, con, res, loader, content, sess_user)=>{
    con.query("SELECT `IDBaiViet`, `TieuDe`, `Anh`, substring(`noiDung`,1,300) `NoiDung`, `NgayDang`, `TacGia`, `IDDanhMuc`, `TrangThai` FROM `baiviet`", (err, result)=>{
        if(err){
            throw err;
        }
        else{
            temp_data = JSON.parse(JSON.stringify(result));
            data.lst_post = temp_data;
            loader.GetCategory(data, con, res, loader, content, sess_user);
        }
    })
}

exports.GetCategory = (data, con, res, loader, content, sess_user)=>{
    con.query("SELECT `IDDanhMuc`, `TenDanhMuc` FROM `danhmucbaiviet`", (err, result)=>{
        if(err){
            throw err;
        } 
        else{
            temp_data = JSON.parse(JSON.stringify(result));
            data.lst_category = temp_data;
            loader.GetUser(data, con, res, loader, content, sess_user);
        }
    })
}

exports.GetUser = (data, con, res, loader, content, sess_user)=>{
    con.query("SELECT `IDNguoiDung`, `TenNguoiDung`, `Email`, `MatKhau`, `Quyen`, `TrangThai` FROM `nguoidung`", (err, result)=>{
        if(err){
            throw err;
        } 
        else{
            temp_data = JSON.parse(JSON.stringify(result));
            data.lst_user = temp_data;
            loader.GetContact(data, con, res, loader, content, sess_user);
        }
    })
}

exports.GetContact = (data, con, res, loader, content, sess_user)=>{
    con.query("SELECT `name`, `email`, `massage` FROM `lienhe`", (err, result)=>{
        if (err) throw err;
        temp_data = JSON.parse(JSON.stringify(result));
        data.lst_contact = temp_data;
        loader.loadFoot(data, con, res, loader, content, sess_user);
    })
}


exports.loadFoot = (data, con, res, loader, content, sess_user)=>{
    res.render('server/layout', {content: content, data: data, sess_user});
}

//Đăng ký tài khoản
exports.Register = (con, res, user_info)=>{
    con.query("INSERT INTO `nguoidung`(`TenNguoiDung`, `Email`, `MatKhau`, `Quyen`, `TrangThai`) VALUES (N'"+user_info.username+"', '"+user_info.email+"', '"+user_info.password+"', '"+user_info.quyen+"', '"+user_info.trangthai+"')", (err, result)=>{
        if (err) throw err;
        console.log("Dang ky thanh cong!");
        res.redirect("/admin/login");
    })
}

//Thêm danh mục bài viết
exports.addCategory = (con, res, category_name)=>{
    con.query("INSERT INTO `danhmucbaiviet`(`TenDanhMuc`) VALUES (N'"+category_name+"')", (err, result)=>{
        if (err) throw err;
        console.log("Them danh muc thanh cong!");
        res.redirect("/admin/category");
    })
}
//Xóa danh mục bài viết
exports.deleteCategory = (con, res, id_category)=>{
    con.query("DELETE FROM `danhmucbaiviet` WHERE `IDDanhMuc` = '"+id_category+"'", (err)=>{
        if (err) throw err;
        console.log("Xoa danh muc thanh cong!");
        res.redirect("/admin/category");
    })
}
//Sửa danh mục bài viết
exports.updateCategory = (con, res, tendanhmuc, id_category)=>{
    con.query("UPDATE `danhmucbaiviet` SET `TenDanhMuc`='"+tendanhmuc+"' WHERE `IDDanhMuc`='"+id_category+"'", (err)=>{
        if (err) throw err;
        console.log("Sửa danh mục thành công!");
        res.redirect("/admin/category");
    })
}

//Thêm tài khoản
exports.addAccount = (con, res, user_info)=>{
    con.query("INSERT INTO `nguoidung`(`TenNguoiDung`, `Email`, `MatKhau`, `Quyen`, `TrangThai`) VALUES ('"+user_info.hoten+"','"+user_info.email+"','"+user_info.matkhau+"','"+user_info.quyen+"','"+user_info.trangthai+"')", (err, result)=>{
        if (err) throw err;
        console.log("Thêm tài khoản thành công!");
        res.redirect("/admin/account");
    })
}
//Xóa tài khoản
exports.deleteAccount = (con, res, id_Account)=>{
    con.query("DELETE FROM `nguoidung` WHERE `IDNguoiDung` = '"+id_Account+"'", (err)=>{
        if (err) throw err;
        console.log("Xoá tài khoản thành công!");
        res.redirect("/admin/account");
    })
}
//Sửa tài khoản
exports.updateAccount = (con, res, user_info, id_account)=>{
    con.query("UPDATE `nguoidung` SET `TenNguoiDung`='"+user_info.hoten+"',`Email`='"+user_info.email+"',`MatKhau`='"+user_info.matkhau+"',`Quyen`='"+user_info.quyen+"',`TrangThai`='"+user_info.trangthai+"' WHERE `IDNguoiDung`='"+id_account+"'", (err)=>{
        if (err) throw err;
        console.log("Sửa tài khoản thành công!");
        res.redirect("/admin/account");
    })
}
//Reset tài khoản
exports.resetAccount = (con, res, email)=>{
    con.query("SELECT * FROM `nguoidung` WHERE `Email` = '"+email+"'", (err, result)=>{
        if (err) throw err;
        if(result.length > 0){
            var nodemailer = require('nodemailer')
            var user = result[0];
            var transporter = nodemailer.createTransport({
                service: 'hotmail',
                auth: {
                    user: user.Email,
                    pass: user.MatKhau
                }
            })
            var options = {
                form: '0306211192@caothang.edu.vn',
                to: user.Email,
                subject: 'Lấy mật khẩu',
                text: 'mailing with nodejs'
            } 
            transporter.sendMail(options, (err, info)=>{
                if(err){
                    console.log(err);
                    return;
                }
                console.log(info.response);
                res.redirect("/admin/login");
            })
        }
    })
}

//Thêm bài viết
exports.addPost = (con, res, post_info)=>{
    con.query("INSERT INTO `baiviet`(`TieuDe`, `Anh`, `NoiDung`, `NgayDang`, `TacGia`, `IDDanhMuc`, `TrangThai`) VALUES (N'"+post_info.tieude+"','"+post_info.anh+"',N'"+post_info.noidung+"','"+post_info.ngaydang+"',N'"+post_info.tacgia+"','"+post_info.iddanhmuc+"','"+post_info.trangthai+"')", (err, result)=>{
        if (err) throw err;
        console.log("Thêm bài viết thành công!");
        res.redirect("/admin/post");
    })
}
//Xóa bài viết
exports.deletePost = (con, res, id_Post)=>{
    con.query("DELETE FROM `baiviet` WHERE `IDBaiViet` = '"+id_Post+"'", (err)=>{
        if (err) throw err;
        console.log("Xoá bài viết thành công!");
        res.redirect("/admin/post");
    })
}
//Sửa bài viết
exports.updatePost = (con, res, post_info, id_post)=>{
    con.query("UPDATE `baiviet` SET `TieuDe`='"+post_info.tieude+"',`Anh`='"+post_info.anh+"',`NoiDung`='"+post_info.noidung+"',`NgayDang`='"+post_info.ngaydang+"',`TacGia`='"+post_info.tacgia+"',`IDDanhMuc`='"+post_info.iddanhmuc+"',`TrangThai`='"+post_info.trangthai+"' WHERE `IDBaiViet`='"+id_post+"'", (err)=>{
        if (err) throw err;
        console.log("Sửa bài viết thành công!");
        res.redirect("/admin/post");
    })
}

//Lấy dữ liệu danh mục muốn update
exports.getCategoryByID = (con, res, content, id, sess_user)=>{
    var data={};
    con.query("SELECT * FROM `danhmucbaiviet` WHERE `IDDanhMuc` = '"+id+"'", (err, result)=>{
        if (err) throw err;
        temp = JSON.parse(JSON.stringify(result));
        data.category = temp;
        res.render('server/layout', {content: content, data: data})
    })
}
//Lấy dữ liệu tài khoản muốn update
exports.getAccountByID = (con, res, content, id, sess_user)=>{
    var data={};
    con.query("SELECT * FROM `nguoidung` WHERE `IDNguoiDung` = '"+id+"'", (err, result)=>{
        if (err) throw err;
        temp = JSON.parse(JSON.stringify(result));
        data.user = temp;
        res.render('server/layout', {content: content, data: data})
    })
}
//Lấy dữ liệu bài viết muốn update
exports.getPostByID = (con, res, content, id, sess_user)=>{
    var data={};
    con.query("SELECT * FROM `baiviet` WHERE `IDBaiViet` = '"+id+"'", (err, result)=>{
        if (err) throw err;
        temp = JSON.parse(JSON.stringify(result));
        data.post = temp;
        res.render('server/layout', {content: content, data: data})
    })

}
