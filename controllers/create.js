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


router.get("/", (request, response) =>{

  console.log("We live");

  response.json({
    Creat: "We gunna cook up some secret sauce"
  });

});

//------------[Department creation]---------------
router.get("/create_department", (request, response) => {

  //INSERT INTO departments VALUES("Computer Science", "1001", "CSCI");
  connection.query("INSERT INTO departments VALUES (\"Business\", \"1006\", \"BUSI\");");

  // connection.query("INSERT INTO departments VALUES (\"" + request.body.dept_name + "\", \"" + request.body.office
  //   + "\", \"" + request.body.abbreviation + "\");");

  connection.query("SELECT * FROM departments;", function (error, results, fields){
    console.log("We added a business department!");
    response.send(results);
  });

});



//------------[Courses creation]---------------
router.get("/create_course", (request, response) => {

  connection.query("INSERT INTO courses VALUES(NULL, 101, \"TALKING BUSINESS\", \"BUSI\", 3);");
  connection.query("INSERT INTO courses VALUES(NULL, 101, \"HOW TO DO CAPITALISM\", \"BUSI\", 3);");

  // connection.query("INSERT INTO courses VALUES(" + (course_ID + 1) + ", " + request.body.course_num + 
  //   ", \"" + request.body.title + "\", \"" + request.body.dept + "\"," + request.body.credits + ");");

  // course_ID += 1;


  connection.query("SELECT * FROM courses;", function (error, results, fields){
    console.log("We added a business course: Intro to Business Talk!");
    console.log(results);
    response.send(results);
  });

});



//------------[Instructor creation]---------------
router.get("/create_instructor", (request, response) => {

  connection.query("INSERT INTO instructors VALUES(NULL, \"Bobby\", \"Moneyman\", \"BUSI\");");

  connection.query("SELECT * FROM instructors;", function (error, results, fields){
    console.log("We added a new instructor!");
    response.send(results);
  });

});




//--------------[Section creation]-----------------
router.get("/create_section", (request, response) => {

  connection.query("INSERT INTO sections VALUES(NULL, 50029, \"01\", 2019, \"SP\", \"0620\", \
    7, 00001123);");
    connection.query("INSERT INTO sections VALUES(NULL, 50029, \"02\", 2019, \"SP\", \"0620\", \
    7, 00001123);");
      connection.query("INSERT INTO sections VALUES(NULL, 50030, \"01\", 2019, \"SP\", \"0620\", \
    7, 00001123);");

/*
INSERT INTO enrollment VALUES(20202011, 10000033);
INSERT INTO enrollment VALUES(20202011, 10000034);
INSERT INTO enrollment VALUES(20202011, 10000035);

*/

  connection.query("SELECT * FROM sections;", function (error, results, fields){
    console.log("We added a new section for Intro to Business Talk!");
    response.send(results);
  });

});


//--------------[Student creation]-----------------
router.get("/create_student", (request, response) => {

  connection.query("INSERT INTO students VALUES(NULL, \"Raman\", \"Kannan\", 18, 0, NULL);");

  connection.query("SELECT * FROM students;", function (error, results, fields){
    console.log("We added a new student named Raman Kannan!");
    response.send(results);
  });

});

/*
CREATE TABLE students(
  student_id INT PRIMARY KEY,
  first_name VARCHAR(20),
  last_name VARCHAR(20),
credits_allowed INT(2),
total_credits INT(3),
status VARCHAR(2) -- derived
);

INSERT INTO students VALUES(20202010, "Saif", "Shakur", 18, 0, NULL);
INSERT INTO students VALUES(20202011, "Mohamed", "Raffik", 18, 90, NULL);
INSERT INTO students VALUES(20202012, "Matthew", "Li", 18, 60, NULL);
INSERT INTO students VALUES(20202013, "Kah", "Yap", 18, 30, NULL);


*/





















/*

*/

module.exports = router;