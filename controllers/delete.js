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

	  console.log('Connected as id (we are deleting): ' + connection.threadId);
});


// -----------------------------------
router.get("/", (request, response) => {

  console.log("We deleting stuff now!");

  response.json({
    Deleting: "We're gunna remove some stuff"
  });

});

//------------[Department Deletions]---------------
router.get("/delete_department", (request, response) =>{

  //get the department's abbreviation
  //deleteall( from courses, where the departments abbree match)
  //get the course_ID
  //deleteall( from sections where the courses_ID match)
  //

  connection.query("DELETE FROM departments WHERE dept_name = \"Business\";");

  //deleteall

  connection.query("SELECT * FROM departments;", function (error, results, fields){

    console.log("We just deleted the Business department");

    response.send(results);
  });
  
});


//------------[Courses Deletions]---------------
router.get("/delete_course", (request, response) => {

  connection.query("DELETE FROM courses WHERE title = \"Intro to Business Talk\";");

  connection.query("SELECT * FROM courses;", function (error, results, fields){

    console.log("We just deleted a Business courses");

    response.send(results);
  });

});


//----------------[Instructor Deleton]-----------------
router.get("/delete_instructor", (request, response) =>{

  connection.query("DELETE FROM instructors WHERE instructor_ID = 1121;");

  connection.query("SELECT * FROM instructors;", function (error, results, fields){

    console.log("We just deleted an instructor");

    response.send(results);
  });
  
});

//----------------[Section Deleton]-----------------
router.get("/delete_section", (request, response) =>{

  connection.query("DELETE FROM sections WHERE section_ID = 10000026;");

  connection.query("SELECT * FROM sections;", function (error, results, fields){

    console.log("We just deleted the second section of Introduction to Computer Science");

    response.send(results);
  });
  
});



//----------------[Student Deleton]-----------------
router.get("/delete_student", (request, response) =>{

  connection.query("DELETE FROM students WHERE student_id = 20202014;");

  connection.query("SELECT * FROM students;", function (error, results, fields){

    console.log("We just deleted Raman the G.O.A.T");

    response.send(results);
  });
  
});



//connection.query("INSERT INTO students VALUES(\"Raman\", \"Kannan\", 18, 0, NULL);");


/*

CREATE TABLE students(
  student_id INT PRIMARY KEY,
  first_name VARCHAR(20),
  last_name VARCHAR(20),
credits_allowed INT(2),
total_credits INT(3),
status VARCHAR(2) -- derived
);
*/



















module.exports = router;