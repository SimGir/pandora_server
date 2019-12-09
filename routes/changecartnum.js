const express=require("express");
const router=express.Router();
//引入数据库连接池
const pool=require("../pool");

//get请求  /changcartnum
router.post("/",(req,res)=>{
    var counts = req.body.counts;
    var product_id=req.body.product_id;
    var user_id = req.session.user_id;
    //如果用户名为空
    if(!user_id){
        res.send({code:-2,msg:"用户未登录"});
        return;
    }

	if(product_id!=undefined){
        //查询该商品是否已经在该用户的购物车中了
        var sql = `select cart_id,counts from pandora_shopping_cart where product_id=? and user_id=?`;
        pool.query(sql,[product_id,user_id],(err,result)=>{
            if(err) console.log(err);
            //console.log(result);
            //如果该用户购物车中并没有该商品
            if(result.length==0){
                // 直接返回，找不到该商品
                res.send({code:-1,msg:"该商品不在购物车中"})
            }else{
                // 如果在该用户的购物车中找到了该商品，就进行数量的操作
                var cart_id = result[0].cart_id;
                //console.log(count,cart_id);
                var sql1=`update pandora_shopping_cart set counts=? where cart_id=?`;
                pool.query(sql1,[counts,cart_id],(err,result)=>{
                    if(err) console.log(err);
                    //console.log(result);
                    if(result.affectedRows>0){
                        res.send({code:1,msg:"修改购物车成功"});
                    }else{
                        res.send({code:-1,msg:"修改购物车失败"});
                    }
                })
            }
        })
	}else{  //如果传递过来的商品id为空，直接返回一个空数组
		res.send({code:-3,msg:"产品编号为空"});
	}
})
//路由导出
module.exports=router;