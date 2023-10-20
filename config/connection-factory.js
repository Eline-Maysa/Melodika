var mysql = require("mysql");


module.exports = function(){
 return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@ITB123456",
    database: "melodika",
    port: 3306
  });
} 
