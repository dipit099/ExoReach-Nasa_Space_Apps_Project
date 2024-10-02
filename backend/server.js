const express = require('express');
const cors = require('cors');
const pool = require('./db')
const loginRouter = require('./routes/login/login');
const registerRouter = require('./routes/login/register');
const homeRouter = require('./routes/home/home')
const exploreExoplanetRouter  = require ('./routes/explore_exoplanets/filtered_search')
const exoplanetDataRouter = require('./routes/exoplanet/exoplanet_info')
const exoshowdownAdminRouter = require('./routes/exoshowdown/contest_admin')
const exoshowdownUserRouter = require('./routes/exoshowdown/contest_user') 
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

app.use('/home', (req, res, next) => {
    req.pool = pool; 
    next(); 
}, homeRouter.router); 

app.use('/explore_exoplanets', (req, res, next) => {
    req.pool = pool; 
    next(); 
}, exploreExoplanetRouter.router);

app.use('/exoplanet', (req, res, next) => {
    req.pool = pool; 
    next(); 
}, exoplanetDataRouter.router); 

app.use('/exoshowdown/admin', (req, res, next) => {
    req.pool = pool; 
    next(); 
}, exoshowdownAdminRouter.router); 

app.use('/exoshowdown/', (req, res, next) => {
    req.pool = pool; 
    next(); 
}, exoshowdownUserRouter.router); 

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});
