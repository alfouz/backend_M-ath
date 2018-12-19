const express = require("express");
const bodyParser = require('body-parser');
const app = express();

const database = require("./dbconfig")

database.init();

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
   });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
   
app.use("/api", require('./routes/router'));