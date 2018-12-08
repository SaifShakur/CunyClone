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
1) get all the times in time_slots where the time_start are >= request.body.time_start
1.1) get all the times in time_slots where the time_end are <= request.body.time_end

2)get all the sections where the sections.time_slots are in 1's subset

${request.body.start_time}
${request.body.end_time}


*/
router.post("/sections_within_time", (request, response) => {

  connection.query(`SELECT sections_subset.*, courses.title FROM courses,
  (SELECT sections.*, time_slots_subset.time_start, time_slots_subset.time_end FROM sections,
  (SELECT * FROM time_slots WHERE time_start >= '${request.body.start_time}' AND time_end <= '${request.body.end_time}') 
  time_slots_subset WHERE sections.time_slot = time_slots_subset.time_slot_id) sections_subset
  WHERE courses.course_ID = sections_subset.course_ID;`, 
  function(error, results){

      console.log(results);
      response.send(results);
  });
});



/*
we want all the sections available for a specific department 

1)Given a certain department, find the abbreviation for that department
2) select all the courses that match that departmnet
3)select all the sections that matches those courses

${request.body.dept_abbreviation}
*/


router.post("/sections_within_department", (request, response) => {

  connection.query(` 

    SELECT sections_with_days.*, instructors.first_name, instructors.last_name FROM instructors,

    (SELECT sections_plus_time.*, days.day_set FROM days,
    (SELECT sections_we_want.*, time_slots.time_start, time_slots.time_end, time_slots.day_id FROM time_slots,
    (SELECT sections.*, courses_we_want.title, courses_we_want.course_num, courses_we_want.dept FROM sections,
    (SELECT * FROM courses WHERE courses.dept = '${request.body.dept_abbreviation}') courses_we_want
    WHERE sections.course_ID = courses_we_want.course_ID) sections_we_want
    WHERE time_slots.time_slot_id = sections_we_want.time_slot) sections_plus_time
    WHERE sections_plus_time.day_ID = days.day_ID) sections_with_days

    WHERE instructors.instructor_ID = sections_with_days.instructor_ID;`, function(error, results){

      console.log(results);
      response.send(results);
  });
});




/*
  connection.query(`SELECT sections.*, courses_we_want.title, courses_we_want.course_num, courses_we_want.dept
    FROM sections,
    (SELECT * FROM courses WHERE courses.dept = 'CSCI') courses_we_want
    WHERE sections.course_ID = courses_we_want.course_ID;`, function(error, results){

      console.log(results);
      response.send(results);
  });
*/



module.exports = router;