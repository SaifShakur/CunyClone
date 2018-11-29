var mysql = require("mysql");
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3001;

//routers
const getterRouter = require("./controllers/getters");
const updateRouter = require("./controllers/update");
const readRouter = require("./controllers/read");
const createRouter = require("./controllers/create");
const deleteRouter = require("./controllers/delete");

// app.use(require("./controllers"));
app.use('/getters', getterRouter);
app.use('/update', updateRouter);
app.use('/read', readRouter);
app.use('/create', createRouter);
app.use('/delete', deleteRouter);

app.listen(PORT, () => {
  console.log(`Issa running on port ${PORT}`);
});


module.exports = app;