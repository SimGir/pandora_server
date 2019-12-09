const express=require("express");
const router=express.Router();
//引入数据库连接池
const pool=require("../pool");

//get请求  /getorder获取订单
router.get("/",(req,res)=>{
    var user_id = req.session.user_id;
    var output = {};
    //如果用户名为空
    if(!user_id){
        res.send({code:-2,msg:"用户未登录"});
        return;
    }else{
        // 查找该用户下的订单
        var sql = "SELECT order_id,status,order_time,deliver_time,received_time,address_id FROM pandora_order WHERE user_id=? order by order_time desc";
        pool.query(sql,[user_id],(err,result)=>{
            if(err) throw err;
            if(result.length!==0){
                var pids = result.map((val)=>{
                    //console.log(val)
                    return val.order_id;
                })
                output.orders = result;
                var sql2 = `select order_id,product_id,counts from pandora_order_detail where order_id in (${pids.join(",")})`;
                pool.query(sql2,[],(err,result)=>{
                    if(err) throw err;
                    if(result.length>0){
                        output.details = result;
                        res.send({code:1,msg:"获取订单成功",data:output})
                    }else{
                        res.send({code:-1,msg:"获取订单失败"})
                    }
                });
            }else{
                res.send({code:1,msg:"该用户没有下订单",data:output})
            }
        });
    }
})
//路由导出
module.exports=router;