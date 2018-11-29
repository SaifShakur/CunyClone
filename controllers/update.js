const express = require('express');
var mysql = require("mysql");
const router = express.Router();
const keys = require("../config/keys")
bodyParser = require('body-parser').json();

var connection = mysql.createConnection({
  host: keys.mysql.host,
  user: keys.mysql.user,
  password: keys.mysql.password,
  database: keys.mysql.database
});

connection.connect(function (error) {
  if (error) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

//-------------------------------------------------------------

router.get("/", (request, response) => {
  response.json({
    Update: "Updating ..."
  });
});

router.post("/dept_office", bodyParser, (request, response) => {
  connection.query(`UPDATE departments 
                    SET ${request.body.office}
                    WHERE dept_name = ${request.body.dept_name};`,
    function (error, results, fields) {
      console.log("updated dept_office");
      response.send(results);
    });

  router.post("/credits", bodyParser, (request, response) => {
    connection.query(`UPDATE                              `)
  })

});

module.exports = router;