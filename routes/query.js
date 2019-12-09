var pool=require("../pool");
module.exports=function(sql,params){
	//返回Promise对象，异步操作连接池
	return new Promise(function(resolve,reject){
		pool.query(sql,params,(err,result)=>{
			if(err) reject(err);
			else resolve(result);
		})
	})
}