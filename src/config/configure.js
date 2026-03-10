const{Pool}=require('pg');

const pool=new Pool({
    user:'postgres',
    host:'localhost',
    database:'mydb',
    password:'Shakti',
    port:5432,
});

module.exports=pool;