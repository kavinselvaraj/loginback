const mysql=require('mysql');
const connection=mysql.createConnection({
    host:'localhost',
    user:'loginpro',
    password:'loginpro@123',
    database:'loginpro'
})
connection.connect((err)=>{
    if(err) throw err;
    console.log("Mysql Connected...!")
})
