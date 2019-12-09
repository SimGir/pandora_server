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
            res.send({code:1,msg:"success",data:result});
        }else{
            res.send({code:-1,msg:"not found"});
        }
    })
})

module.exports = router;