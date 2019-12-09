const express=require("express");
const router=express.Router();
//引入数据库连接池
const pool=require("../pool");

//get请求  /love
router.get("/",(req,res)=>{
    var product_id=req.query.product_id;
    var user_id = req.session.user_id;
    //如果用户名为空
    if(!user_id){
        res.send({code:-2,msg:"用户未登录"});
        return;
    }

	if(product_id!=undefined){
        //查询该商品是否已经被该用户添加收藏了
        var sql = `select love_id from pandora_product_love where product_id=? and user_id=?`;
        pool.query(sql,[product_id,user_id],(err,result)=>{
            if(err) console.log(err);
            //console.log(result);
            var love_id = result[0].love_id;
            //如果该用户已经添加该商品
            if(result.length>0){
                //将商品id从收藏表中删掉
                var sql1=`delete from pandora_product_love where love_id=?`;
                pool.query(sql1,[love_id],(err,result)=>{
                    if(err) console.log(err);
                    //console.log(result);
                    if(result.affectedRows>0){
                        res.send({code:1,msg:"取消收藏成功"});
                    }else{
                        res.send({code:-1,msg:"取消收藏失败"});
                    }
                })
            }else{
                res.send({code:2,msg:"您还未收藏该商品"})
            }
        })
	}else{  //如果传递过来的商品id为空，直接返回一个空数组
		res.send({code:-3,msg:"产品编号为空"});
	}
})
//路由导出
module.exports=router;