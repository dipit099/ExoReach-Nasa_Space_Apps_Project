## To run the code:
```bash
Create db.js file in the root directory
const Pool = require("pg").Pool;
const pool = new Pool({
    host: "",
    port: 5432,
    user: "",
    database: "",
    password: "",
});

module.exports = pool;


```