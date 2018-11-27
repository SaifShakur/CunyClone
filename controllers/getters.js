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
    Main_Page: "You're looking at it"
  });

});



router.get("/departments", (request, response) =>{

  connection.query("SELECT * FROM departments;", function (error, results, fields){

    console.log("We got departments data");
    response.send(results);
  });
});



router.get("/courses", (request, response) =>{

  connection.query("SELECT * FROM courses;", function (error, results, fields){

    console.log("We got courses data");
    response.send(results);
  });
});



router.get("/instructors", (request, response) =>{

  connection.query("SELECT * FROM instructors;", function (error, results, fields){

    console.log("We got instructors data");
    response.send(results);
  });

});

router.get("/days", (request, response) =>{

  connection.query("SELECT * FROM days;", function (error, results, fields){

    console.log("We got days data");
    response.send(results);
  });

});

router.get("/time_slots", (request, response) =>{

  connection.query("SELECT * FROM time_slots;", function (error, results, fields){

    console.log("We got time_slots data");
    response.send(results);
  });

});


router.get("/rooms", (request, response) =>{

  connection.query("SELECT * FROM rooms;", function (error, results, fields){

    console.log("We got rooms data");
    response.send(results);
  });

});


router.get("/sections", (request, response) =>{

  connection.query("SELECT * FROM sections;", function (error, results, fields){

    console.log("We got sections data");
    response.send(results);
  });

});


router.get("/students", (request, response) =>{

  connection.query("SELECT * FROM students;", function (error, results, fields){

    console.log("We got students data");
    response.send(results);
  });

});


router.get("/enrollment", (request, response) =>{

  connection.query("SELECT * FROM enrollment;", function (error, results, fields){

    console.log("We got enrollment data");
    response.send(results);
  });

});



/*

*/

module.exports = router;