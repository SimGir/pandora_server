const express = require("express");
const pool = require("../pool.js");
const router = express.Router();

//get请求  /gift
router.get("/",(req,res)=>{
	var page_name = req.query.page_name;
    //查找该页面所有的产品编号
	var sql1=`select product_id from pandora_page_product where page_name=?`;
	pool.query(sql1,[page_name],(err,result)=>{
		if(err) throw(err);
		var arr = [];
		for(var i=0;i<result.length;i++){
			arr.push(result[i].product_id);
		}
		//console.log(arr);
		var str = arr.join(",");
		//按查找到的产品编号查找产品详情
		var sql2=`select product_id,title,spec,img1,img2,price,mark,family_id,category_id from pandora_product where product_id in (${str})`;
		pool.query(sql2,[],(err,result)=>{
			if(err) throw(err);
			var products = result;
			//console.log(result);
			//查找商品分类名称
			var sql3 = `select category_id,category_name from pandora_product_category`;
			pool.query(sql3,[],(err,result)=>{
				if(err) throw err
				var category = result;
				//定义要传输到前台的数据
				var output={
					bracelet:[],
					chuan:[],
					ring:[],
					earring:[]
				};
				//将查询到的结果进行分组，给前台页面的不同的区域
				for(var i=0;i<products.length;i++){
					for(var j=0;j<category.length;j++){
						if(products[i].category_id == category[j].category_id){
							output[category[j].category_name].push(products[i]);
						}
					}
				}
				//console.log(output);
				//将产品按照产品分类分组
				res.send(output);
			})
		})
    })
});
  
module.exports=router;