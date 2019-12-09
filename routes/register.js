const express = require("express");
const router = express.Router();
const pool = require("../pool.js");

router.post("/",(req,res)=>{
    //获取脚手架参数
    var user_name = req.body.user_name;
    var user_pwd = req.body.user_pwd;
    //console.log(user_name,user_pwd);

    var sql = `INSERT INTO pandora_user(user_name,user_pwd) VALUES(?,md5(?))`;
    pool.query(sql,[user_name,user_pwd],(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(result.affectedRows>0){
            res.send({code:1,msg:"注册成功"});
        }else{
            res.send({code:-1,msg:"注册失败"});
        }
    })
})

module.exports = router;