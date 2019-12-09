const express=require("express");
const router=express.Router();
const query=require("./query");
//引入数据库连接池
//const pool=require("../pool");

//get请求  /detail
router.get("/",(req,res)=>{
	var product_id=req.query.product_id;
	//需要返回给浏览器的数据
	var output={
		product:{},  //product_id=？的商品的信息
		details:[],  //商品的详情信息
		pics:[],  //商品的大图，可以用放大镜显示
		specs:[]  //商品规格
	}
	if(product_id!==undefined){
		//查找商品id等于某值的商品的信息
		var sql1=`select * from pandora_product where product_id=?`;
		query(sql1,[product_id]).then(result=>{
			output.product=result[0];
			var family_id=output.product["family_id"];
			//通过家族id，找到跟该商品同家族的不同规格的商品
			var sql2=`select spec,product_id from pandora_product where family_id=?`;
			return query(sql2,[family_id]);
		}).then(result=>{
			output.specs=result;
			//找到商品的供展示的大图小图
			var sql3=`select pics_small,pics_big from pandora_product_pic where product_id=?`
			return query(sql3,[product_id]);
		}).then(result=>{
			output.pics=result;
			//查找商品详情图，细节介绍
			var sql4 = `select details_img from pandora_product_detail where product_id=?`
			return query(sql4,[product_id]);
		}).then(result=>{
			output.details = result;
			//console.log(output);
			res.send(output);
			
		})
		
		/* pool.query(sql1,[product_id],(err,result)=>{
			if(err) console.log(err);
			console.log(result);
			output.product=result[0];
			var family_id=output.product["family_id"];
			//通过家族id，找到跟该商品同家族的不同规格的商品
			var sql2=`select spec,product_id from pandora_product where family_id=?`;
			pool.query(sql2,[family_id],(err,result)=>{
				if(err) console.log(err);
				output.specs=result;
				//找到商品的供展示的大图小图
				var sql3=`select pics_small,pics_big from pandora_product_pic where product_id=?`
				pool.query(sql3,[product_id],(err,result)=>{
					if(err) console.log(err);
					output.pics=result;
					//查找商品详情图，细节介绍
					var sql4 = `select details_img from pandora_product_detail where product_id=?`
					pool.query(sql4,[product_id],(err,result)=>{
						if(err) throw err
						output.details = result;
						//console.log(output)
						res.send(output);
					})
				})
			})
		}) */
	}else{  //如果传递过来的商品id为空，直接返回一个空数组
		res.send(output);
	}
})
//路由导出
module.exports=router;