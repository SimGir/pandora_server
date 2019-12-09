const express=require("express");
const router=express.Router();
//引入数据库连接池
const pool=require("../pool");

//get请求  /getcart
router.get("/",(req,res)=>{
    var user_id = req.session.user_id;
    //console.log("getcart:",user_id)
    //如果用户名为空
    if(!user_id){
        res.send({code:-2,msg:"用户未登录"});
        return;
    }else{
        // 查找用户购物车中的商品有哪些
        var sql = "SELECT title,counts,pro.product_id,img1,price,spec FROM pandora_shopping_cart AS cart LEFT OUTER JOIN pandora_product AS pro ON cart.product_id=pro.product_id WHERE user_id=?";
        pool.query(sql,[user_id],(err,result)=>{
            if(err) throw err;
            if(result){
                res.send({code:1,msg:"查找成功",data:result})
            }else{
                res.send({code:-1,msg:"查找失败"})
            }
        })
    }
})
//路由导出
module.exports=router;