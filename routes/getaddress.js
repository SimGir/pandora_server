const express=require("express");
const router=express.Router();
//引入数据库连接池
const pool=require("../pool");

//get请求  /getaddress获取收货地址
router.get("/",(req,res)=>{
    var user_id = req.session.user_id;
    //如果用户名为空
    if(!user_id){
        res.send({code:-2,msg:"用户未登录"});
        return;
    }else{
        // 查找该用户下的收货地址
        var sql = "select address_id,receiver,address,cellphone,postcode,is_default from pandora_receiver_address where user_id=?";
        pool.query(sql,[user_id],(err,result)=>{
            if(err) throw err;
            if(result.length!==0){
                res.send({code:1,msg:"查找成功",data:result})
            }else{
                res.send({code:-1,msg:"未查找到记录",data:[]})
            }
        })
    }
})
//路由导出
module.exports=router;