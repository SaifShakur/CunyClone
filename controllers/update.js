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

//updates instructor name. 
//the body requires: first_name, last_name, and instructor_ID
router.post("/instructor_name", bodyParser, (request, response) => {
  console.log(request.body);
  connection.query(`UPDATE instructors 
                    SET first_name = "${request.body.first_name}",
                        last_name = "${request.body.last_name}"
                    WHERE instructor_ID = ${request.body.instructor_ID};`,
    (error, results, fields) => {
      console.log("updated instructor's name");
      response.send(results);
    });
});





//update student name
//the body requires: first_name, last_name, and student_id
router.post("/student_name", bodyParser, (request, response) => {
  console.log(request.body);
  connection.query(`UPDATE students 
                    SET first_name = "${request.body.first_name}",
                        last_name = "${request.body.last_name}"
                    WHERE student_id = ${request.body.sid};`,
    (error, results, fields) => {
      console.log("updated student name");
      response.send(results);
    });
});







//update student status and credits_allowed
//the body requires: status and credits_allowed
router.post("/student_status", bodyParser, (request, response) => {
  console.log(request.body);
  connection.query(`UPDATE students 
                    SET first_name = "${request.body.status}",
                        last_name = "${request.body.credits_allowed}"
                    WHERE student_id = ${request.body.student_id};`,
    (error, results, fields) => {
      console.log("updated status and credits_allowed");
      response.send(results);
    });
});

//update dept_office. the body requires: office, dept_name
router.post("/dept_office", bodyParser, (request, response) => {
  console.log(request.body);
  connection.query(`UPDATE departments 
                    SET office = "${request.body.office}"
                    WHERE dept_name = "${request.body.dept_name}";`,
    (error, results, fields) => {
      console.log("updated dept_office");
      response.send(results);
    });
});

//updates course credits. the body requires: credits and course_ID
router.post("/credits", bodyParser, (request, response) => {
  console.log(request.body);
  connection.query(`UPDATE courses
                    SET credits = ${request.body.credits}
                    WHERE course_ID = ${request.body.course_ID};`,
    (error, results, fields) => {
      console.log("updated course credits");
      response.send(results);
    });
});

//updates course title. the body requires: title and course_ID
router.post("/title", bodyParser, (request, response) => {
  console.log(request.body);
  connection.query(`UPDATE courses
                    SET title = "${request.body.title}"
                    WHERE course_ID = ${request.body.course_ID};`,
    (error, results, fields) => {
      console.log("updated course credits");
      response.send(results);
    });
});



//updates course title. the body requires: title and course_ID
router.post("/title", bodyParser, (request, response) => {
  console.log(request.body);
  connection.query(`UPDATE courses
                    SET title = "${request.body.title}"
                    WHERE course_ID = ${request.body.course_ID};`,
    (error, results, fields) => {
      console.log("updated course credits");
      response.send(results);
    });
});



//updates course title. the body requires: title and course_ID
/*
${request.body.instructor_ID}
${request.body.section_ID}

*/
router.post("/update_section_instructor", (request, response) => {

  connection.query(`UPDATE sections SET instructor_ID = ${request.body.instructor_ID} 
    WHERE sections.section_ID = ${request.body.section_ID};`, (error, results, fields) => {
        console.log("updated course credits");
        response.send(results);
      }
  );
});












module.exports = router;