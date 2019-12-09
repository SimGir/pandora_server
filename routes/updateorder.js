const express=require("express");
const router=express.Router();
//引入数据库连接池
const pool=require("../pool");

//get请求  /updateorder更新订单状态
router.get("/",(req,res)=>{
    var user_id = req.session.user_id;
    var order_id = req.query.order_id;
    var status = req.query.status;
    var deliver_time = req.query.deliver_time;
    var received_time = req.query.received_time;
    console.log(received_time)

    //如果用户名为空
    if(!user_id){
        res.send({code:-2,msg:"用户未登录"});
        return;
    }
    //如果寄件时间不为空，则订单状态更新为运输中
    if(deliver_time!==""){
        // 查找该用户下的订单
        var sql = "update pandora_order set status=2,deliver_time=? WHERE order_id=?";
        pool.query(sql,[deliver_time,order_id],(err,result)=>{
            if(err) throw err;
            if(result.affectedRows>0){
                res.send({code:1,msg:"订单状态更新为运输中"})
            }else{
                res.send({code:-1,msg:"订单更新失败"})
            }
        });
    }
    //如果收货时间不为空，则订单状态更新为已签收
    else if(received_time!==""){
        // 查找该用户下的订单
        var sql = "update pandora_order set status=3,received_time=? WHERE order_id=?";
        pool.query(sql,[received_time,order_id],(err,result)=>{
            if(err) throw err;
            if(result.affectedRows>0){
                res.send({code:1,msg:"订单状态更新为已签收"})
            }else{
                res.send({code:-1,msg:"订单更新失败"})
            }
        });
    }
    //如果不为空，则订单状态更新为已取消
    else if(status!==""){
        // 查找该用户下的订单
        var sql = "update pandora_order set status=4 WHERE order_id=?";
        pool.query(sql,[order_id],(err,result)=>{
            if(err) throw err;
            if(result.affectedRows>0){
                res.send({code:1,msg:"订单状态更新为已取消"})
            }else{
                res.send({code:-1,msg:"订单更新失败"})
            }
        });
    }
})
//路由导出
module.exports=router;