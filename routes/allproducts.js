const express=require("express");
const router=express.Router();
//引入数据库连接池
const pool=require("../pool");

//get请求  /allproducts 查找全部的商品信息
router.get("/",(req,res)=>{
    var pno = req.query.pno;  //页码，每次查询10条数据
    var recode = (pno-1)*10;  //从第几条记录开始查找
    var pageCount;  //总页数

    var sql = `select product_id from pandora_product`;
    pool.query(sql,[],(err,result)=>{
        if(err) throw err;
        pageCount = Math.ceil(result.length/10);  //向上取整
    })
    var sql2 = `select product_id,title,img1,price,spec from pandora_product limit ?,10`;
    pool.query(sql2,[recode],(err,result)=>{
        if(err) throw err;
        if(result.length!==0){
            res.send({code:1,msg:"查找成功",data:result,pageCount})
        }else{
            var data = [];
            res.send({code:1,msg:"未查找到记录",data})
        }
    })
})
//路由导出
module.exports=router;