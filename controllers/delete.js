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


router.get("/delete_department_test", (request, response) =>{

  //get the department's abbreviation
  //deleteall( from courses, where the departments abbree match)
  //get the course_ID
  //deleteall( from sections where the courses_ID match)
  //

  //connection.query("DELETE FROM departments WHERE dept_name = \"Business\";");



  /*
    `SELECT * FROM events, (SELECT * FROM groups_to_users WHERE group_id = '${request.body.group_id}')
    A WHERE events.user_email = A.user_email;`,
  */
  //deleteall

  connection.query("SELECT * FROM departments;", function (error, results, fields){

    console.log("We just deleted the Business department");

    response.send(results);
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


  connection.query("DELETE enrollment.* FROM enrollment, (SELECT sections.* FROM sections, \
    (SELECT * FROM courses WHERE dept = 'BUSI') del_courses WHERE sections.course_ID = del_courses.course_ID) \
    del_sections WHERE enrollment.section_id = del_sections.section_ID;", function (error, results){

    console.log("DELETEING enrollements QUERY: ")
    console.log("\n");
    console.log(results);
    //response.json(results);
    //response.send(results);
  });


  connection.query("DELETE sections.* FROM sections, (SELECT * FROM courses WHERE dept = 'BUSI') del_courses\
   WHERE sections.course_ID = del_courses.course_ID;", function (error, results){

    console.log(" DELETEING sections QUERY: ")
    console.log("\n");
    console.log(results);
    //response.json(results);
    //response.send(results);
  });

  connection.query("DELETE FROM courses WHERE dept = 'BUSI';", function (error, results){
    console.log("DELETEING courses QUERY: ")
    console.log("\n");
    console.log(results);
    //response.json(results);

    //response.send(results);
  });

  connection.query("DELETE FROM instructors WHERE dept = 'BUSI';", function (error, results){
    console.log("\n");
    console.log("DELETEING instructors QUERY: ")
    console.log("\n");
    console.log(results);
    //response.json(results);

    //response.send(results);
  });

  connection.query("DELETE FROM departments WHERE abbreviation = 'BUSI';", function (error, results){
    console.log("DELETEING department QUERY: ")
    console.log("\n");
    console.log(results);
    //response.json(results);

    //response.send(results);
  });

  connection.query("SELECT * FROM departments;", function (error, results, fields){

    console.log("We just deleted a department");
    response.send(results);
  });
  
});


//------------[Courses Deletions]---------------
router.get("/delete_course", (request, response) => {

  //var title = "Intro to Business Talk";

    connection.query("DELETE enrollment.* FROM enrollment, (SELECT sections.* FROM sections, \
    (SELECT * FROM courses WHERE title = 'Intro to Business Talk') del_courses WHERE \
    sections.course_ID = del_courses.course_ID) del_sections WHERE enrollment.section_id = del_sections.section_ID;", 
    function (error, results){

    console.log("DELETEING enrollements QUERY: ")
    console.log("\n");
    console.log(results);
    //response.json(results);
    //response.send(results);
  });


  connection.query("DELETE sections.* FROM sections, (SELECT * FROM courses WHERE title = 'Intro to Business Talk')\
   del_courses WHERE sections.course_ID = del_courses.course_ID;", function (error, results){

    console.log(" DELETEING sections QUERY: ")
    console.log("\n");
    console.log(results);
    //response.json(results);
    //response.send(results);
  });

  connection.query("DELETE FROM courses WHERE title = 'Intro to Business Talk';", function (error, results){

    console.log("DELETEING courses QUERY: ")
    console.log("\n");
    console.log(results);
    //response.json(results);

    //response.send(results);
  });

  connection.query("SELECT * FROM courses;", function (error, results, fields){

    console.log("We just deleted a course");
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

  connection.query("DELETE enrollment.* FROM enrollment, (SELECT * FROM sections WHERE section_ID = 10000026) \
    del_sections WHERE enrollment.section_id = del_sections.section_ID;", function (error, results){

    console.log("DELETEING enrollements QUERY: ")
    console.log("\n");
    console.log(results);
    //response.json(results);
    //response.send(results);
  });


  connection.query("DELETE FROM sections WHERE section_ID = 10000026;", function (error, results){

    console.log(" DELETEING sections QUERY: ")
    console.log("\n");
    console.log(results);
    //response.send(results);
  });

  
  connection.query("SELECT * FROM sections;", function (error, results, fields){

    console.log("We just deleted a bunch of section(s)");
    response.send(results);
  });

});



//----------------[Student Deleton]-----------------
router.get("/delete_student", (request, response) =>{


  connection.query("DELETE enrollment.* FROM enrollment, (SELECT * FROM students WHERE student_id = 20202014) \
    del_students WHERE enrollment.student_id = del_students.student_id;", function (error, results){

    console.log("DELETEING enrollements QUERY: ")
    console.log("\n");
    console.log(results);
    //response.json(results);
    //response.send(results);
  });

  connection.query("DELETE FROM students WHERE student_id = 20202014;", function (error, results){

    console.log(" DELETEING students QUERY: ")
    console.log("\n");
    console.log(results);
    //response.send(results);
  });

  connection.query("SELECT * FROM students;", function (error, results, fields){

    console.log("We just deleted Raman the G.O.A.T");
    response.send(results);
  });
  
});



module.exports = router;