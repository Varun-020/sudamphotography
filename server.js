const express = require("express");
const connect = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const path = require('path');
require("dotenv").config();

const app = express();
const port = process.env.PORT;
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "client/build/")));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    });
}


//database connection
connect();
//middlewares
app.use(express.json());


//routes
app.use('/', userRoutes);



app.listen(port, () => {
    console.log(`App is running in port : ${port}`);
})
