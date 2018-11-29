var mysql = require("mysql");
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3001;

//routers
const getterRouter = require("./controllers/getters");
const updateRouter = require("./controllers/update");

// app.use(require("./controllers"));
app.use('/getters', getterRouter);
app.use('/update', updateRouter);

app.listen(PORT, () => {
  console.log(`Issa running on port ${PORT}`);
});


module.exports = app;