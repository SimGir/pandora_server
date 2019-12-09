const express=require("express");
const router=express.Router();
//引入数据库连接池
const pool=require("../pool");

//get请求  /getlove
router.get("/",(req,res)=>{
    var user_id = req.session.user_id;
    //如果用户名为空
    if(!user_id){
        res.send({code:-2,msg:"用户未登录"});
        return;
    }else{
        // 查找用户收藏夹中的商品有哪些
        var sql = "select product_id from pandora_product_love where user_id=?";
        pool.query(sql,[user_id],(err,result)=>{
            if(err) throw err;
            if(result.length!==0){
                var pid = [];
                //console.log(result)
                for(var i=0;i<result.length;i++){
                    pid.push(result[i].product_id);
                }
                //console.log("string：" + pid);
                // 查找商品详情
                var sql1 = `select product_id,title,img1 from pandora_product where product_id in (?)`;
                pool.query(sql1,[pid],(err,result)=>{
                    if(err) throw err;
                    if(result.length!==0){
                        res.send({code:1,msg:"查找成功",data:result})
                    }
                })
            }else{
                var data = [];
                res.send({code:1,msg:"未查找到记录",data})
            }
        })
    }
})
//路由导出
module.exports=router;