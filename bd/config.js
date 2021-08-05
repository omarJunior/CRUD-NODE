const mysql = require("mysql");

const dbConnect = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'node_mysql_crud_db'
});

dbConnect.connect(function(e){
    if(e){
        throw new Error(e);
    }else{
        console.log("Database Connected")
    }
})

module.exports = dbConnect;