const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();

const PORT = 8000;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    req.pool = pool;
    next();
});

app.use('/login', require('./routes/login/LoginRouter'));
app.use('/register', require('./routes/login/RegisterRouter'));
app.use('/home', require('./routes/home/HomeRouter'));
app.use('/explore_exoplanets', require('./routes/explore_exoplanets/FilteredSearchRouter'));
app.use('/exoplanet', require('./routes/exoplanet/ExoplanetInfoRouter'));
app.use('/exoshowdown/admin', require('./routes/exoshowdown/ContestAdminRouter'));
app.use('/exoshowdown', require('./routes/exoshowdown/ContestUserRouter'));
app.use('/exoquiz/admin', require('./routes/exoquiz/ExoquizAdminRouter'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});
