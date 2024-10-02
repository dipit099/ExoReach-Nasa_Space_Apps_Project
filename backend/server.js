const express = require('express');
const cors = require('cors');
const pool = require('./db')
const loginRouter = require('./routes/login/login');
const registerRouter = require('./routes/login/register');

const app = express();
const PORT = 5000;


app.use(express.json());
app.use(cors());


app.use('/login', (req, res, next) => {
    req.pool = pool;
    next(); 
}, loginRouter.router); 

app.use('/register', (req, res, next) => {
    req.pool = pool; 
    next(); 
}, registerRouter.router); 

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});
