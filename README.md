# 潘多拉购物商城：服务器API接口

支持前端网站动态显示数据，支持前端网页与后端交互完成一系列逻辑操作

## 项目运行

前提：安装node环境，具体教程看官网 https://nodejs.org/zh-cn/ 

1. 克隆项目到本地

	git clone https://github.com/SimGir/pandora_server.git

2. 导入数据库

	创建名为pandora的数据库,执行pandora.sql文件

3. 进入项目，安装依赖

	cd pandora_server
	npm install

4. 更改数据库连接配置

	更改pool.js文件

5. 启动项目

	node app.js

	现在，前端网站可以获取数据库中的商品数据显示到页面上了，只有礼品页是动态网页哦！