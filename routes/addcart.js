const express=require("express");
const router=express.Router();
//引入数据库连接池
const pool=require("../pool");

//get请求  /addcart
router.get("/",(req,res)=>{
    var product_id=req.query.product_id;
    var user_id = req.session.user_id;
    //console.log("addcart:",user_id)
    //如果用户名为空
    if(!user_id){
        res.send({code:-2,msg:"用户未登录"});
        return;
    }

	if(product_id!=undefined){
        //查询该商品是否已经被该用户添加到购物车了
        var sql = `select cart_id,counts from pandora_shopping_cart where product_id=? and user_id=?`;
        var count;  //商品数量
        pool.query(sql,[product_id,user_id],(err,result)=>{
            if(err) console.log(err);
            //console.log(result);
            //如果该用户并未添加该商品
            if(result.length==0){
                //将商品id存入购物车中
                count = 1;
                var sql1=`insert into pandora_shopping_cart values(null,?,?,?)`;
                pool.query(sql1,[product_id,user_id,count],(err,result)=>{
                    if(err) console.log(err);
                    //console.log(result);
                    if(result.affectedRows>0){
                        res.send({code:1,msg:"加入购物车成功"});
                    }else{
                        res.send({code:-1,msg:"加入购物车失败"});
                    }
                })
            }else{  // 如果已经添加该商品，则将购物车中的商品数量 +1
                var cart_id = result[0].cart_id;
                count = result[0].counts + 1;
                //console.log(count,cart_id);
                var sql1=`update pandora_shopping_cart set counts=? where cart_id=?`;
                pool.query(sql1,[count,cart_id],(err,result)=>{
                    if(err) console.log(err);
                    //console.log(result);
                    if(result.affectedRows>0){
                        res.send({code:1,msg:"加入购物车成功"});
                    }else{
                        res.send({code:-1,msg:"加入购物车失败"});
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