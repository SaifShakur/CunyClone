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
    Create: "We gunna cook up some secret sauce"
  });

});

//------------[Department creation]---------------
router.post("/department", bodyParser, (request, response) => {
  //INSERT INTO departments 
  //VALUES("dept_name", "office", "abbreviation");
  // {
  //   "dept_name": "BUSINESS",
  //   "office": "1010",
  //   "abbreviation": "BUSI"
  // }
  connection.query(`INSERT INTO departments 
                    VALUES ("${request.body.dept_name}",
                    "${request.body.office}",
                    "${request.body.abbreviation}");`,

    (error, results, fields) => {
      console.log("We added a department!");
      response.json(results);
    });
});

//------------[Courses creation]---------------
router.post("/course", bodyParser, (request, response) => {
  //INSERT INTO departments 
  //VALUES(${course_ID}, course_num, "title", dept, credits)
  //dept should already exist
  // {
  //   "course_num": 101, 
  //   "title": "intro to something", 
  //   "dept": "MATH", 
  //   "credits": 4
  // }
  connection.query(`INSERT INTO courses 
                    VALUES(null,
                           ${request.body.course_num}, 
                           "${request.body.title}",
                           "${request.body.dept}",
                           ${request.body.credits});`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
      }
      console.log("We added a course!");
      response.json(results);
    });
});

//------------[Instructor creation]---------------
router.post("/instructor", bodyParser, (request, response) => {

  //INSERT INTO instructors 
  // {
  //   "first_name": "Rocky", 
  //   "last_name": "Baby", 
  //   "dept": "HIST"  -->the dept must exist 
  // }
  connection.query(`INSERT INTO instructors 
                    VALUES(null, 
                           "${request.body.first_name}",
                           "${request.body.last_name}",
                           "${request.body.dept}");`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
      }
      console.log("We added a new instructor!");
      response.send(results);
    });
});

//--------------[Section creation]-----------------
router.post("/section", bodyParser, (request, response) => {

  //INSERT INTO sections
  //course_ID, room_num, time_slot, instructor_ID must exist
  //{
  // 	"course_ID": 50024, 
  // 	"section_num": "03", 
  // 	"year": 2020,
  // 	"semester": "FA",
  // 	"room_num": "0200",
  // 	"time_slot": 4, 
  // 	"instructor_ID": 1122
  // } 
  connection.query(`INSERT INTO sections 
                    VALUES(null, 
                           ${request.body.course_ID}, 
                          "${request.body.section_num}", 
                           ${request.body.year},
                          "${request.body.semester}",
                          "${request.body.room_num}",
                           ${request.body.time_slot},
                           ${request.body.instructor_ID});`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
      }
      console.log("We added a new section");
      response.json(results);
    });
});

//--------------[Student creation]-----------------
router.post("/student", bodyParser, (request, response) => {
  // example:
  // {
  //   "first_name": "Ramen",
  //   "last_name": "Noodles",
  //   "credits_allowed": 17,
  //   "credits": 55
  // }
  connection.query(`INSERT INTO students 
                    VALUES(null, 
                          "${request.body.first_name}",
                          "${request.body.last_name}",
                           ${request.body.credits_allowed},
                           ${request.body.credits});`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
      }
      console.log("We added a new student");
      response.json(results);
    });
});

module.exports = router;