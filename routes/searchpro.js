const express = require("express");
const pool = require("../pool.js");
var router = express.Router();

router.get("/",(req,res)=>{
    var title = req.query.title;
    title = '%'+title.trim()+'%';
    var sql = "select * from pandora_product where title like ?";
    pool.query(sql,[title],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({
                success: true,
                code: 1,
                msg:"成功",
                data: result
            });
        }else{
            res.send({
                success: false,
                code: -1,
                msg:"没有查找到该商品",
                data: []
            });
        }
    })
})

module.exports = router;