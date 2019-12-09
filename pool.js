//创建mysql连接池
const mysql = require('mysql');
var pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'pandora',
  connectionLimit: 10 
});
//把创建好的连接池导出
module.exports = pool;




