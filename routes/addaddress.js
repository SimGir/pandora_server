const express=require("express");
const router=express.Router();
//引入数据库连接池
const pool=require("../pool");

//get请求  /addaddress添加收货地址
router.get("/",(req,res)=>{
    var user_id = req.session.user_id;
    var receiver = req.query.receiver;
    var address = req.query.address;
    var cellphone = req.query.cellphone;
    var postcode = req.query.postcode;
    var isDefault = req.query.isDefault;
    var is_default;

    //如果用户名为空
    if(!user_id){
        res.send({code:-2,msg:"用户未登录"});
        return;
    }

    // 查找用户是否有默认地址
    var sql = "select address_id from pandora_receiver_address where user_id=? and is_default=1";
    new Promise(function(resolve,reject){
        pool.query(sql,[user_id],(err,result)=>{
            if(err) throw err;
            // 如果查找到用户的默认地址
            if(result.length>0){
                // 如果用户将新增的地址设置为默认地址，就取消原来的默认地址
                if(isDefault=="true"){
                    is_default = 1;
                    var address_id = result[0].address_id;
                    //console.log(result)
                    //console.log(address_id)
                    var sql2 = "update pandora_receiver_address set is_default=0 where address_id=?";
                    pool.query(sql2,[address_id],(err,result)=>{
                        if(err) throw err;
                        if(result.affectedRows>0){
                            //console.log("默认地址修改成功")
                            resolve();
                        }else{
                            //console.log("默认地址修改失败")
                            reject("默认地址修改失败");
                        }
                    })
                }else{  // 用户没有设置新增的地址为默认地址
                    is_default = 0;
                    resolve();
                }
            }else{  //如果用户没有默认地址，那么不管用户有没有勾选新增的地址为默认地址，新增的地址都将被设置为默认地址
                is_default = 1;
                //console.log("没有查找到默认地址")
                resolve();
            }
        })
    }).then(()=>{
        //console.log(is_default);
        //添加收货地址
        var sql3 = `insert into pandora_receiver_address values(null,?,?,?,?,?,?)`;
        pool.query(sql3,[receiver,address,cellphone,postcode,is_default,user_id],(err,result)=>{
            if(err) throw(err);
            if(result.affectedRows>0){
                res.send({code:1,msg:"新增地址成功"});
            }else{
                res.send({code:-1,msg:"新增地址失败"});
            }
        })
    }).catch((e)=>{
        console.log(e)
    })
})
    
    
//路由导出
module.exports=router;