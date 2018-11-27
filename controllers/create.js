const express = require('express');
var mysql = require("mysql");
const router = express.Router();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'cfclone'
});


connection.connect(function(error) {

	  if (error) {
	    console.error('error connecting: ' + err.stack);
	    return;
	  }

	  console.log('connected as id ' + connection.threadId);
});

// -----------------------------------
router.get("/", (request, response) =>{

  console.log("We live");

  response.json({
    Creat: "We gunna cook up some secret sauce"
  });

});



router.get("/create_department", (request, response) => {

  //INSERT INTO departments VALUES("Computer Science", "1001", "CSCI");
  connection.query("INSERT INTO departments VALUES (\"Business\", \"1006\", \"BUSI\");");

  connection.query("SELECT * FROM departments;", function (error, results, fields){
    console.log("We added a business department!");
    response.send(results);
  });

  /*
  connection.query("SELECT * FROM departments;", function (error, results, fields){
    console.log("We got departments data");
    response.send(results);
  });
  */
});


/*

*/

module.exports = router;