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

*/
router.get("/sections_within_time", (request, response) => {

  /*
    request.body.time_start
    request.body.time_end
  */
  
  connection.query("SELECT sections_subset.*, courses.title FROM courses,\
  (SELECT sections.*, time_slots_subset.time_start, time_slots_subset.time_end FROM sections,\
  (SELECT * FROM time_slots WHERE time_start >= '9:45' AND time_end <= '11:00') time_slots_subset\
  WHERE sections.time_slot = time_slots_subset.time_slot_id) sections_subset\
  WHERE courses.course_ID = sections_subset.course_ID;", 
  function(error, results){

      console.log(results);
      response.send(results);
  });

});













/*
1) get all the times in time_slots where the time_start are >= request.body.time_start
1.1) get all the times in time_slots where the time_end are <= request.body.time_end

2)get all the sections where the sections.time_slots are in 1's subset


router.get("/sections_within_time", (request, response) => {

  /*
    request.body.time_start
    request.body.time_end
  

      connection.query("SELECT time_slot_id FROM time_slots WHERE time_start >= '9:45' AND time_end <= '11:00'",
    function(error, results){

      console.log(results);
    });


  connection.query("SELECT sections.*, time_slots_subset.time_start, time_slots_subset.time_end FROM sections,\
    (SELECT * FROM time_slots WHERE time_start >= '9:45' AND time_end <= '11:00') time_slots_subset\
    WHERE sections.time_slot = time_slots_subset.time_slot_id;",

    function(error, results){

      var temp = results;

       connection.query("SELECT courses.* FROM courses, (SELECT sections.* FROM sections,\
        (SELECT time_slot_id FROM time_slots WHERE time_start >= '9:45' AND time_end <= '11:00') time_slots_subset\
        WHERE sections.time_slot = time_slots_subset.time_slot_id) sections_subset\
        WHERE courses.course_ID = sections_subset.course_ID;", 
        function(error, results){

           
            //adding the title of each course to each section of the course
            results.map((course) => {
              temp.map((section) => {
                  if(course.course_ID == section.course_ID)
                    section.title = course.title;
              });
            });

            response.send(temp);
        });

      console.log(results);
      response.send(results);

    });

});
*/










module.exports = router;