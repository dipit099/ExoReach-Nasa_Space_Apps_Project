require('dotenv').config();
const { Pool } = require("pg");

const pool = new Pool({
    host: "aws-0-ap-southeast-1.pooler.supabase.com",
    port: 6543,
    user: "postgres.crtqyfeppilazklquwvc",
    database: "postgres",
    password: "UE#MhtRn_*!WPd9", 
});


module.exports = pool