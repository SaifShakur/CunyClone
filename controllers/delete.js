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

  console.log("We deleting stuff now!");

  response.json({
    Deleting: "We're gunna remove some stuff"
  });

});


/*
  Bottom-Up Deletion

  1) remove from enrollments where sections_ID match
  2) remove from sections where course_id Mathces
  3) remove from instructors where dept abbree
  4) remove from courses where dept abbree match
  5) remove department
*/

//------------[Department Deletions]---------------
router.get("/delete_department", (request, response) =>{

  connection.query(`DELETE enrollment.* FROM enrollment, (SELECT sections.* FROM sections, \
    (SELECT * FROM courses WHERE dept = "${request.body.abbreviation}") del_courses 
    WHERE sections.course_ID = del_courses.course_ID) del_sections \
    WHERE enrollment.section_id = del_sections.section_ID;`, function (error, results){

    console.log("DELETEING enrollements QUERY: ")
    console.log("\n");
    console.log(results);
  });

  connection.query(`DELETE sections.* FROM sections, (SELECT * FROM courses WHERE dept = "${request.body.abbreviation}")\
   del_courses WHERE sections.course_ID = del_courses.course_ID;`, function (error, results){

    console.log(" DELETEING sections QUERY: ")
    console.log("\n");
    console.log(results);
  });

  connection.query(`DELETE FROM courses WHERE dept = "${request.body.abbreviation}";`, function (error, results){
    console.log("DELETEING courses QUERY: ")
    console.log("\n");
    console.log(results);
  });

  connection.query(`DELETE FROM instructors WHERE dept = "${request.body.abbreviation}";`, function (error, results){
    console.log("\n");
    console.log("DELETEING instructors QUERY: ")
    console.log("\n");
    console.log(results);
  });

  connection.query(`DELETE FROM departments WHERE abbreviation = "${request.body.abbreviation}";`, function (error, results){
    console.log("DELETEING department QUERY: ")
    console.log("\n");
    console.log(results);
  });

  //to confirm we deleted a department (refer to console if anything)
  connection.query("SELECT * FROM departments;", function (error, results, fields){

    console.log("We just deleted a department");
    response.send(results);
  });
  
});

//------------[Courses Deletions]---------------
router.get("/delete_course", (request, response) => {

  //var title = "Intro to Business Talk";

    connection.query(`DELETE enrollment.* FROM enrollment, (SELECT sections.* FROM sections, \
    (SELECT * FROM courses WHERE course_ID = ${request.body.course_ID}) del_courses WHERE \
    sections.course_ID = del_courses.course_ID) del_sections WHERE enrollment.section_id = del_sections.section_ID;`, 
    function (error, results){

    console.log("DELETEING enrollements QUERY: ")
    console.log("\n");
    console.log(results);
  });


  connection.query(`DELETE sections.* FROM sections, (SELECT * FROM courses WHERE course_ID = ${request.body.course_ID}')\
   del_courses WHERE sections.course_ID = del_courses.course_ID;`, function (error, results){

    console.log(" DELETEING sections QUERY: ")
    console.log("\n");
    console.log(results);
  });

  connection.query(`DELETE FROM courses WHERE course_ID = ${request.body.course_ID};`, function (error, results){

    console.log("DELETEING courses QUERY: ")
    console.log("\n");
    console.log(results);
  });

  connection.query("SELECT * FROM courses;", function (error, results, fields){

    console.log("We just deleted a course");
    response.send(results);
  });

});

//----------------[Instructor Deleton]-----------------
router.get("/delete_instructor", (request, response) =>{

  connection.query(`DELETE FROM instructors WHERE instructor_ID = ${request.body.instructor_ID};`);

  connection.query("SELECT * FROM instructors;", function (error, results, fields){

    console.log("We just deleted an instructor");

    response.send(results);
  });
  
});

//----------------[Section Deleton]-----------------
router.get("/delete_section", (request, response) =>{

  connection.query(`DELETE enrollment.* FROM enrollment, \
    (SELECT * FROM sections WHERE section_ID = ${request.body.section_ID}) \
    del_sections WHERE enrollment.section_id = del_sections.section_ID;`, function (error, results){

    console.log("DELETEING enrollements QUERY: ")
    console.log("\n");
    console.log(results);
  });


  connection.query(`DELETE FROM sections WHERE section_ID = ${request.body.section_ID};`, function (error, results){

    console.log(" DELETEING sections QUERY: ")
    console.log("\n");
    console.log(results);
  });

  
  connection.query("SELECT * FROM sections;", function (error, results, fields){

    console.log("We just deleted a bunch of section(s)");
    response.send(results);
  });

});

//----------------[Student Deleton]-----------------
router.get("/delete_student", (request, response) =>{


  connection.query(`DELETE enrollment.* FROM enrollment, (SELECT * FROM students WHERE student_id = ${request.body.sid}) \
    del_students WHERE enrollment.student_id = del_students.student_id;`, function (error, results){

    console.log("DELETEING enrollements QUERY: ")
    console.log("\n");
    console.log(results);
  });

  connection.query(`DELETE FROM students WHERE student_id = ${request.body.sid};`, function (error, results){

    console.log(" DELETEING students QUERY: ")
    console.log("\n");
    console.log(results);
  });

  connection.query("SELECT * FROM students;", function (error, results, fields){

    console.log("We just deleted Raman the G.O.A.T");
    response.send(results);
  });
  
});

module.exports = router;