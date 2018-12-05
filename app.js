var mysql = require("mysql");
var express = require("express");
var app = express();
var cors = require("cors")
var PORT = process.env.PORT || 3001;

//routers
const createRouter = require("./controllers/create");
const readRouter = require("./controllers/read");
const updateRouter = require("./controllers/update");
const deleteRouter = require("./controllers/delete");

app.use(cors());
app.use('/create', createRouter);
app.use('/read', readRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);

app.listen(PORT, () => {
  console.log(`Issa running on port ${PORT}`);
});


module.exports = app;