const pool = require("./db");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const PORT = 8000;

app.use('/hello', require('./routes/helloRoute'));


app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});