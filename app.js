var mysql = require("mysql");
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3001;
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//routers
const createRouter = require("./controllers/create");
const readRouter = require("./controllers/read");
const updateRouter = require("./controllers/update");
const deleteRouter = require("./controllers/delete");


app.use('/create', createRouter);
app.use('/read', readRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);

app.listen(PORT, () => {
  console.log(`Issa running on port ${PORT}`);
});


module.exports = app;