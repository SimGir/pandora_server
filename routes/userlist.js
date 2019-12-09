const express=require("express");
const router=express.Router();
//引入数据库连接池
const pool=require("../pool");

//get请求  /userlist获取所有用户
router.get("/",(req,res)=>{
    // 查找所有用户
    var sql = "select user_id,user_name from pandora_user";
    pool.query(sql,[],(err,result)=>{
        if(err) throw err;
        if(result.length!==0){
            res.send({code:1,msg:"查找成功",data:result})
        }else{
            var data = [];
            res.send({code:1,msg:"未查找到记录",data})
        }
    })
})
//路由导出
module.exports=router;