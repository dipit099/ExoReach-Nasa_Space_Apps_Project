require('dotenv').config();

// Access environment variables
const {  DB_PASSWORD } = process.env;


const Pool = require("pg").Pool;
const pool = new Pool({
    host: "aws-0-ap-southeast-1.pooler.supabase.com",
    port: 6543,
    user: "postgres.crtqyfeppilazklquwvc",
    database: "postgres",
    password: DB_PASSWORD,
});

module.exports = pool;
