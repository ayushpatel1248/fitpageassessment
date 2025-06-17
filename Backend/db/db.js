require("dotenv").config();
const {Pool} =require('pg');

const poolConfig = {
    max : 5,
    min : 2,
    idleTimeoutMillis : 600000,
};

const dataBase = process.env.DB_NAME;  
const userName = process.env.DB_USER;
const password = process.env.DB_PASS;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
console.log(dataBase, userName, password, host, port);
poolConfig.connectionString = `postgresql://${userName}:${password}@${host}:${port}/${dataBase}?ssl=true`;

const client = new Pool(poolConfig);

exports.client = client; 
// postgresql://user:l9BSxBVrZ8EHPgzVdhbGf5EUwqIrsBkG@dpg-cv0rvjlumphs739tnu90-a.singapore-postgres.render.com/postgress_2erx