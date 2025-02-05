require('dotenv').config();
const { Pool } = require("pg");

const pool = new Pool({
    host: "aws-0-ap-southeast-1.pooler.supabase.com",
    port: 6543,
    user: "postgres.kjvzushsjucrbdcmdgmu",
    database: "postgres",
    password: "u4Wnmf0S8ssmfn8G", 
});


module.exports = pool
