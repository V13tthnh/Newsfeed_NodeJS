exports.loadHead = (con, res, loader, content)=>{
    var data = {};
    loader.GetPost(data, con, res, loader, content);
}

exports.GetPost = (data, con, res, loader, content)=>{
    con.query("SELECT `IDBaiViet`, `TieuDe`, `Anh`, substring(`noiDung`,1,300) `NoiDung`, `NgayDang`, `TacGia`, `IDDanhMuc`, `TrangThai` FROM `baiviet`", (err, result)=>{
        //if(err) throw err;
        temp_data = JSON.parse(JSON.stringify(result));
        data.listBV = temp_data;
        loader.GetCategory(data, con, res, loader, content);
    })
}

exports.GetCategory = (data, con, res, loader, content)=>{
    con.query("SELECT `IDDanhMuc`, `TenDanhMuc` FROM `danhmucbaiviet`", (err, result)=>{
        if(err){
            throw err;
        } 
        else{
            temp_data = JSON.parse(JSON.stringify(result));
            data.lst_category = temp_data;
            loader.GetPostByID(data, con, res, loader, content);
        }
    })
}

exports.GetPostByID = (data, con, res, loader, content)=>{
    //Lấy danh sách bài viết có idDanhMuc = 1(Công nghệ)
    con.query("SELECT `IDBaiViet`, `TieuDe`, `Anh`, substring(`noiDung`,1,300) `NoiDung`, `NgayDang`, `TacGia`, `IDDanhMuc`, `TrangThai` FROM `baiviet` WHERE IDDanhMuc = 1", (err, result)=>{
        if(err){
            throw err;
        } 
        else{
            temp_data = JSON.parse(JSON.stringify(result));
            data.lst_CN = temp_data;
        }
    })
    //Lấy danh sách bài viết có idDanhMuc = 3(doanh nghiệp)
    con.query("SELECT `IDBaiViet`, `TieuDe`, `Anh`, substring(`noiDung`,1,300) `NoiDung`, `NgayDang`, `TacGia`, `IDDanhMuc`, `TrangThai` FROM `baiviet` WHERE IDDanhMuc = 3", (err, result)=>{
        if(err){
            throw err;
        } 
        else{
            temp_data = JSON.parse(JSON.stringify(result));
            data.lst_DN = temp_data;
        }
    })
    //Lấy danh sách bài viết có idDanhMuc = 6(thể thao)
    con.query("SELECT `IDBaiViet`, `TieuDe`, `Anh`, substring(`noiDung`,1,300) `NoiDung`, `NgayDang`, `TacGia`, `IDDanhMuc`, `TrangThai` FROM `baiviet` WHERE IDDanhMuc = 6", (err, result)=>{
        if(err){
            throw err;
        } 
        else{
            temp_data = JSON.parse(JSON.stringify(result));
            data.lst_TT = temp_data;
        }
    })
    //Lấy danh sách bài viết có idDanhMuc = 5(Games)
    con.query("SELECT `IDBaiViet`, `TieuDe`, `Anh`, substring(`noiDung`,1,300) `NoiDung`, `NgayDang`, `TacGia`, `IDDanhMuc`, `TrangThai` FROM `baiviet` WHERE IDDanhMuc = 5", (err, result)=>{
        if(err){
            throw err;
        } 
        else{
            temp_data = JSON.parse(JSON.stringify(result));
            data.lst_game = temp_data;
            loader.loadContent(data, con, res, loader, content);
        }
    })
}

exports.loadContent = (data, con, res, loader, content)=>{
    loader.loadFoot(data, con, res, loader, content);
}
 
exports.loadFoot = (data, con, res, loader, content)=>{
    con.query("SELECT `name`, `email`, `massage` FROM `lienhe`", (err, result)=>{
        if (err) throw err;
        temp_data = JSON.parse(JSON.stringify(result));
        data.lst_Foot = temp_data;
        res.render('client/layout', {content: content, data: data});
    })
}

//Lấy danh sách bài viết theo IDBaiViet
exports.loadDetailByID = (con, res, loader, content, id)=>{
    var data = {};
    con.query("SELECT `IDBaiViet`, `TieuDe`, `Anh`, `NoiDung`, `NgayDang`, `TacGia`, `IDDanhMuc`, `TrangThai` FROM `baiviet` WHERE `IDBaiViet` = '"+id+"'", (err, result)=>{
        if(err) throw err;
        temp_data = JSON.parse(JSON.stringify(result));
        data.lst_BV = temp_data;
        var iddanhmuc = data.lst_BV[0]['IDDanhMuc'];
        loader.loadRelatedPostByID(data, con, res, loader, content, iddanhmuc);
    })
}
//Lấy danh sách bài viết liên quan
exports.loadRelatedPostByID = (data, con, res, loader, content, iddanhmuc)=>{
    con.query("SELECT `IDBaiViet`, `TieuDe`, `Anh`, `NoiDung`, `NgayDang`, `TacGia`, `IDDanhMuc`, `TrangThai` FROM `baiviet` WHERE `IDDanhMuc` = '"+iddanhmuc+"'", (err, result)=>{
        if(err) throw err;
        temp_data = JSON.parse(JSON.stringify(result));
        data.lst_related = temp_data;
        loader.GetPost(data, con, res, loader, content);
    })
}

//Thêm liên hệ
exports.InsertContact = (con, res, content, name, email, massage)=>{
    con.query("INSERT INTO `lienhe`(`name`, `email`, `massage`) VALUES (N'"+name+"', '"+email+"', N'"+massage+"')", (err, result)=>{
        if (err) throw err;
        console.log('inserted successfully!');
        res.redirect('/contact');
    })
}


