const express=require("express");
const router=express.Router();
//引入数据库连接池
const pool=require("../pool");

//get请求  /delcart
router.get("/",(req,res)=>{
    var product_id=req.query.product_id;
    var user_id = req.session.user_id;
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
                //返回删除失败
                res.send({code:-2,msg:"该商品没在购物车中"})
            }else{  // 用户购物车中有该商品，将商品删除
                var sql=`delete from pandora_shopping_cart where product_id=? and user_id=?`;
                pool.query(sql,[product_id,user_id],(err,result)=>{
                    if(err) throw err;
                    //console.log(result);
                    if(result.affectedRows>0){
                        res.send({code:1,msg:"删除商品车成功"});
                    }else{
                        res.send({code:-1,msg:"删除商品失败"});
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