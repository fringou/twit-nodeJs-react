const express = require('express');
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


require("dotenv").config({ path: "./src/.env"})
require("./src/config/dataBase")



//json parsing
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

// route
const userRoute = require('./src/routes/user.routes');
app.use('/api/user',userRoute);

const texteRouter = require('./src/routes/texte');
app.use('/', texteRouter);

module.exports = app;
