const express=require("express");
const router=express.Router();
//引入数据库连接池
const pool=require("../pool");

//get请求  /addorder创建订单
router.get("/",(req,res)=>{
    var order_time = req.query.order_time;
    var address_id = parseInt(req.query.address_id);
    // 注意：传递进来的orderPros是数组object类型，但是里面的对象是字符串类型，需要将其转换为对象
    var proStr = req.query.proStr;
    var user_id = req.session.user_id;

    var orderPros = JSON.parse(proStr);
    var orderNum = 0;  //订单明细中新增记录条数
    var cartNum = 0;  //购物车中更新记录条数
    //如果用户名为空
    if(!user_id){
        res.send({code:-2,msg:"用户未登录"});
        return;
    }

    //订单中要有商品才能创建订单
	if(orderPros.length>0&&address_id!==0){
        //创建订单，在pandora_order
        var sql = `insert into pandora_order(order_id,status,order_time,address_id,user_id) values(null,1,?,?,?)`;
        pool.query(sql,[order_time,address_id,user_id],(err,result)=>{
            if(err) throw err;
            //添加成功
            if(result.affectedRows>0){
                var sql2 = "select order_id from pandora_order where user_id=? and order_time=?"
                pool.query(sql2,[user_id,order_time],(err,result)=>{
                    if(err) throw err;
                    //查找到订单编号
                    if(result.length>0){
                        var order_id = result[0].order_id;
                        var sql3 = "insert into pandora_order_detail values(null,?,?,?)";
                        for(var pro of orderPros){
                            // 将string类型的pro转换成json对象
                            //pro = JSON.parse(pro);
                            //console.log(pro)
                            pool.query(sql3,[order_id,pro.product_id,pro.counts],(err,result)=>{
                                if(err) throw err;
                                if(result.affectedRows>0){
                                    orderNum++;
                                    if(orderNum===orderPros.length){
                                        //订单中所有的商品都添加到了订单明细中
                                    // 订单创建成功，将购物车中的该商品删掉
                                        var sql4=`delete from pandora_shopping_cart where product_id=? and user_id=?`;
                                        for(var pro of orderPros){
                                            //pro = JSON.parse(pro);
                                            pool.query(sql4,[pro.product_id,user_id],(err,result)=>{
                                                if(err) throw err;
                                                if(result.affectedRows>0){
                                                //console.log("更新购物车成功")
                                                // 只有当订单创建成功，且订单中的商品在购物车中删掉，才能计数加1
                                                cartNum ++;
                                                //console.log(orderNum)
                                                //订单明细全部添加完成后，再发送响应
                                                if(cartNum === orderPros.length){
                                                    res.send({code:1,msg:"订单明细添加成功"})
                                                }
                                                }else{
                                                    //console.log("更新购物车失败")
                                                    res.send({code:-1,msg:"更新购物车失败"})
                                                }
                                            })
                                        }
                                    }    
                                }else{
                                    res.send({code:-1,msg:"订单明细添加失败"})
                                }
                            })
                        }   
                    }else{
                        res.send({code:-1,msg:"订单编号查找失败"});
                    }
                })
            }else{
                res.send({code:-1,msg:"订单添加失败"})
            }
        })
	}else{
		res.send({code:-3,msg:"订单商品为空"});
	}
})
//路由导出
module.exports=router;