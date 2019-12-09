const express=require("express");
const router=express.Router();
//引入数据库连接池
const pool=require("../pool");

//get请求  /getproduct 根据多个商品id查找商品信息
router.get("/",(req,res)=>{
    var user_id = req.session.user_id;
    var pids = req.query.pids;
    //如果用户名为空
    if(!user_id){
        res.send({code:-2,msg:"用户未登录"});
        return;
    }else{
        // 查找该用户下的收货地址
        var sql = `select product_id,title,img1,price,spec from pandora_product where product_id in (${pids.join(",")})`;
        pool.query(sql,[],(err,result)=>{
            if(err) throw err;
            if(result.length!==0){
                res.send({code:1,msg:"查找成功",data:result})
            }else{
                var data = [];
                res.send({code:1,msg:"未查找到记录",data})
            }
        })
    }
})
//路由导出
module.exports=router;