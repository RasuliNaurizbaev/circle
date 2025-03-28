const mysql2 = require("mysql2");

const connect = mysql2.createConnect({
    host: "localhost",
    user: "root",
    password: "root",
    database: "client-database"
});

connect.connect((err)=>{
    if(err){
        console.log("database connected");
    }
});

export default connect;