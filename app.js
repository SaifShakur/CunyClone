var mysql = require("mysql");
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3001;

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'cfclone'
});

//to connection and show that we have connected
connection.connect(function(error) {

	  if (error) {
	    console.error('error connecting: ' + err.stack);
	    return;
	  }

	  console.log('connected as id ' + connection.threadId);
});


app.use(require("./controllers"));





/*
// a route that closes the connection to database: connection.end(); ? 
*/

/*


// a route that opens the connection to database: connection.connect(); ? 
*/


app.listen(PORT, () => {
  console.log(`Issa running on port ${PORT}`);
});



/*
Notes:

*/