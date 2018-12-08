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

//--------------- Update instructor's name --------------------
//updates instructor name. 
//the body requires: first_name, last_name, and instructor_ID
// {
// 	"first_name": "updated", 
// 	"last_name": "updated", 
// 	"instructor_ID": 1112
// }
router.put("/instructor_name", bodyParser, (request, response) => {
  connection.query(`UPDATE instructors 
                    SET first_name = "${request.body.first_name}",
                        last_name = "${request.body.last_name}"
                    WHERE instructor_ID = ${request.body.instructor_ID};`,
    (error, results, fields) => {
      if(error){
        console.log(error);
      }
      console.log("updated instructor's name");
      response.send(results);
    });
});





//update student name
//the body requires: first_name, last_name, and student_id
// {
// 	"first_name": "updated", 
// 	"last_name": "updated", 
// 	"student_id": 20202010
// }
router.put("/student_name", bodyParser, (request, response) => {
  connection.query(`UPDATE students 
                    SET first_name = "${request.body.first_name}",
                        last_name = "${request.body.last_name}"
                    WHERE student_id = ${request.body.student_id};`,
    (error, results, fields) => {
      if(error){
        console.log(error);
      }
      console.log("updated student name");
      response.send(results);
    });
});







//update student status and credits_allowed
//the body requires: status and credits_allowed
router.put("/student_status", bodyParser, (request, response) => {
  console.log(request.body);
  connection.query(`UPDATE students 
                    SET credits_allowed = "${request.body.credits_allowed}"
                    WHERE student_id = ${request.body.student_id};`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
      }
      console.log("updated status and credits_allowed");
      response.json(results);
    });
});

//--------------- Update dept office --------------------
//update dept_office. the body requires: office, dept_name
// {
// 	"office": "9999", 
// 	"dept_name": "History"
// }
router.put("/dept_office", bodyParser, (request, response) => {
  connection.query(`UPDATE departments 
                    SET office = "${request.body.office}"
                    WHERE dept_name = "${request.body.dept_name}";`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
      }
      console.log("updated dept_office");
      response.send(results);
    });
});

//--------------- Update course credits --------------------
//updates course credits. the body requires: credits and course_ID
// {
// 	"credits": 99,
// 	"course_ID": 50000
// }
router.put("/course_credits", bodyParser, (request, response) => {
  connection.query(`UPDATE courses
                    SET credits = ${request.body.credits}
                    WHERE course_ID = ${request.body.course_ID};`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
      }
      console.log("updated course credits");
      response.send(results);
    }); 
});

//--------------- Update course title --------------------
//updates course title. the body requires: title and course_ID
// {
// 	"title": "intro to blah",
// 	"course_ID" : 50000
// }
router.put("/course_title", bodyParser, (request, response) => {
  connection.query(`UPDATE courses
                    SET title = "${request.body.title}"
                    WHERE course_ID = ${request.body.course_ID};`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
      }
      console.log("updated course title");
      response.send(results);
    });
});

//--------------- Update section room and time --------------------
// {
// 	"section_ID": 10000001,
// 	"time_slot": 9,
// 	"room_num": "0200"
// }
router.put("/section", bodyParser, (request, response) => {
  connection.query(`UPDATE sections
                    SET room_num = "${request.body.room_num}",
                        time_slot = ${request.body.time_slot}
                    WHERE section_ID = ${request.body.section_ID};`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
      }
      console.log("updated section room and time");
      response.send(results);
    });
});



//updates course title. the body requires: title and course_ID
router.put("/title", bodyParser, (request, response) => {
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
router.put("/update_section_instructor", (request, response) => {

  connection.query(`UPDATE sections SET instructor_ID = ${request.body.instructor_ID} 
    WHERE sections.section_ID = ${request.body.section_ID};`, (error, results, fields) => {
        console.log("updated course credits");
        response.send(results);
      }
  );
});












module.exports = router;