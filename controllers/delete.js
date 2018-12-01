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

//------------[Department Deletions]---------------
router.delete("/department", bodyParser, (request, response) => {
  //Needs a better query
  //get the department's abbreviation
  //deleteall( from courses, where the departments abbree match)
  //get the course_ID
  //deleteall( from sections where the courses_ID match)
  //

  connection.query("DELETE FROM departments WHERE dept_name = \"Business\";",
    (error, results, fields) => {
      if (error) {
        console.log(error);
      }
      console.log("We just deleted a department");
      response.json(results);
    });
});

//------------[Courses Deletions]---------------
router.delete("/course", bodyParser, (request, response) => {
  // {
  //   "title": "intro to something",
  //   "course_ID": null
  // }
  // {
  //   "title": "",
  //   "course_ID": 50026
  // }
  connection.query(`DELETE FROM courses 
                    WHERE title = "${request.body.title}"
                    OR course_ID = ${request.body.course_ID};`,

    (error, results, fields) => {
      if (error) {
        console.log(error);
      }
      console.log("We just deleted a course");
      response.json(results);
    });
});

//----------------[Instructor Deleton]-----------------
router.delete("/instructor", bodyParser, (request, response) => {
  // {
  //   "instructor_ID": 1121
  // }
  connection.query(`DELETE FROM instructors 
                    WHERE instructor_ID = ${request.body.instructor_ID};`,

    (error, results, fields) => {
      if (error) {
        console.log(error);
      }
      console.log("We just deleted an instructor");
      response.json(results);
    });
});

//----------------[Section Deleton]-----------------
router.delete("/section", bodyParser, (request, response) => {
  // {
  //   "section_ID": 10000028
  // }
  connection.query(`DELETE FROM sections 
                    WHERE section_ID = ${request.body.section_ID};`,

    (error, results, fields) => {
      if (error) {
        console.log(error);
      }
      console.log("We just deleted a section");
      response.json(results);
    });

});

//----------------[Student Deleton]-----------------
router.delete("/student", bodyParser, (request, response) => {
  // {
  //   "sid": 20202015
  // }
  connection.query(`DELETE FROM students 
                    WHERE student_id = ${request.body.sid};`,

    (error, results, fields) => {
      if (error) {
        console.log(error);
      }
      console.log("We just deleted a student");
      response.json(results);
    });
});

module.exports = router;