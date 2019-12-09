const express = require("express");
const router = express.Router();
const pool = require("../pool.js");

router.get("/",(req,res)=>{
    //获取脚手架参数
    var uname = req.query.user_name;
    var upwd = req.query.user_pwd;
    //console.log(uname,upwd);
    //在数据库中根据接收的用户名和密码查询用户
    var sql = "SELECT user_id FROM pandora_user WHERE user_name = ? AND user_pwd = md5(?)";
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err)throw err;
        //判断获取的执行结果，将结果返回脚手架
        //如果查找结果为0，表示用户名密码错误，登录失败
        if(result.length==0){
            res.send({code:-1,msg:"用户名或密码有误"})
        }else{  //查找结果长度不为0，表示用户名密码正确，登录成功
            //console.log(result);
            req.session.user_id = result[0].user_id;
            res.send({code:1,msg:"登录成功"});
        }
    })
})

module.exports = router;