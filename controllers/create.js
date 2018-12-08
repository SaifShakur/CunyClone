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



/*

1)    search through the sections table for that section
1.a)  if the capacity for tha tsections is >= 1, return okay
1.b)  else, reponse.send(400) 
2)    insert the student.id into the enrollment table and then UPDATE that section capacity by 1


  //request.body.student_id
  //request.body.section_id

*/


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
  //  "course_ID": 50024, 
  //  "section_num": "03", 
  //  "year": 2020,
  //  "semester": "FA",
  //  "room_num": "0200",
  //  "time_slot": 4, 
  //  "instructor_ID": 1122
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


/*

1)    search through the sections table for that section
1.a)  if the capacity for tha tsections is >= 1, return okay
1.b)  else, reponse.send(400) 
2)    insert the student.id into the enrollment table and then UPDATE that section capacity by 1


  //request.body.student_id
  //request.body.section_id

*/

//--------------[Adding a student in enrollment creation]-----------------
router.post("/create_enrollment", (request, response) => {

  connection.query(`SELECT capacity FROM sections WHERE section_ID = ${request.body.section_id}`, 
    function (error, results, fields){

      var cap = results[0].capacity;

      if(cap < 1){
        console.log("THERE'S NO ROOM FOR THIS SECTION");
        response.send(400);
      }
      else{

        connection.query(`INSERT INTO enrollment VALUES(${request.body.student_id}, ${request.body.section_id});`);

        //subtracting one from the capacity
        connection.query(`UPDATE sections SET capacity = capacity - 1 WHERE section_ID = ${request.body.section_id};`);

        console.log(`SELECT capacity FROM sections WHERE section_ID = ${request.body.section_id}`);
      }

  });

  connection.query("SELECT * FROM enrollment;", function (error, results, fields){
    console.log("We added a new student to a new section!");
    response.send(results);
  });

});


//-------------------------------------------------------------------------



//TEST DATA SET UP


// connection.query("INSERT INTO departments VALUES (\"Business\", \"1006\", \"BUSI\");");
// INSERT INTO departments VALUES ("Business", "1006", "BUSI");

// connection.query("INSERT INTO courses VALUES(NULL, 101, \"HOW TO DO CAPITALISM\", \"BUSI\", 3);");
// INSERT INTO courses VALUES(NULL, 101, "HOW TO DO CAPITALISM", "BUSI", 1);

// connection.query("INSERT INTO instructors VALUES(NULL, \"Bobby\", \"Moneyman\", \"BUSI\");");
// s

// //sections values
// //NULL, course_id, fine, fine, fine, fine, fine, STAFF, fine

// connection.query("INSERT INTO sections VALUES(NULL, 50031, \"01\", 2019, \"SP\", \"0620\", \
//     7, 9999, 1);");
// INSERT INTO sections VALUES(NULL, 50021, "01", 2019, "SP", "0620", 7, 1, 1);



// connection.query(`INSERT INTO enrollment VALUES(20202010,10000023);`);
// connection.query(`INSERT INTO enrollment VALUES(20202011,10000023);`);

//   connection.query("INSERT INTO students VALUES(NULL, \"Raman\", \"Kannan\", 18, 0, NULL);");




module.exports = router;