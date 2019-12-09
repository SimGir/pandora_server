//使用express构建web服务器
const express = require('express');
const bodyParser = require('body-parser');
const detail = require("./routes/detail");
const gift = require("./routes/gift");
const register = require("./routes/register");
const login = require("./routes/login");
const love = require("./routes/love");
const getlove = require("./routes/getlove");
const cancellove = require("./routes/cancellove");
const addcart = require("./routes/addcart");
const delcart = require("./routes/delcart");
const getcart = require("./routes/getcart");
const changecartnum = require("./routes/changecartnum");
const searchpro = require("./routes/searchpro");
const addorder = require("./routes/addorder");
const getorder = require("./routes/getorder");
const updateorder = require("./routes/updateorder");
const addaddress = require("./routes/addaddress");
const getaddress = require("./routes/getaddress");
const getproduct = require("./routes/getproduct");
const allproducts = require("./routes/allproducts");
const userlist = require("./routes/userlist");

const cors = require("cors");
const session = require("express-session");
//服务器
var app = express();
//设置服务器端口
app.listen(5050);
//跨域设置，接收来自localhost或127.0.0.1的端口的请求
//3001:pandora购物商城PC端
//4200:pandora购物商城移动端
app.use(cors({
	origin: [
		"http://localhost:3001",
		"http://127.0.0.1:3001",
		"http://localhost:4200",
		"http://127.0.0.1:4200"
	],
	credentials: true  //每次请求需要验证，必须加上，否则不能跨域访问
}));

//允许所有来源的请求，因为
app.all("",function(req,res,next){
	res.header('Access-Control-Allow-Origin','*')
	res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS')
	if(req.method == 'OPTIONS'){
		res.send(200);
	}else{
		next();
	}
})
/* var allowCorssDomain = function (req,res,next) {
	res.header('Access-Control-Allow-Origin','*'),
	res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE'),
	res.header('Access-Control-Allow-Headers','Content-Type');
	next();
}
app.use(allowCorssDomain); */

//保存用户登录凭证
app.use(session({
	secret:"128为字符串",
	resave:true,  //每次请求更新数据
	saveUninitialized:true  //保存初始数据
}))
//使用body-parser中间件，接收post请求传递的参数
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
//托管静态资源到public目录下，前后端分离，这里不需要再设置托管目录
//app.use(express.static('public'));

/*使用路由器来管理路由*/
app.use("/detail", detail);  // 商品详情
app.use("/gift", gift);  // 礼品页的商品数据
app.use("/register", register);  // 注册
app.use("/login", login);  // 登录
app.use("/love", love);  // 添加收藏
app.use("/getlove", getlove);  // 查找某用户收藏夹全部商品
app.use("/cancellove",cancellove);  // 取消收藏
app.use("/addcart",addcart);  // 添加购物车
app.use("/delcart",delcart);  // 删除购物车中的商品
app.use("/getcart",getcart);  // 查找某用户的购物车
app.use("/changecartnum",changecartnum);  // 修改购物车商品数量
app.use("/searchpro",searchpro);  // 搜索商品
app.use("/addorder",addorder);  // 添加订单
app.use("/getorder",getorder);  // 查找订单
app.use("/updateorder",updateorder);  // 更新订单
app.use("/addaddress",addaddress);  // 添加收货地址
app.use("/getaddress",getaddress);  // 查找收货地址
app.use("/allproducts",allproducts);  // 查找所有商品
app.use("/getproduct",getproduct);  // 根据多个商品编号查找商品详情
app.use("/userlist",userlist);  // 查找所有用户



