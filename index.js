const express = require('express');
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// items in the global namespace are accessible throught out the node application
global.db = new sqlite3.Database('./database.db',function(err)
{
	if(err)
	{
		console.error(err);
		process.exit(1); //Bail out we can't connect to the DB
	}
	else
	{
		console.log("Database connected");
		global.db.run("PRAGMA foreign_keys=ON"); //This tells SQLite to pay attention to foreign key constraints
	}
});

// routes
require("./routes/author")(app);
require("./routes/reader")(app);


// the views folder 
app.set("views", __dirname + "/views");

// set the app to use ejs for rendering
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// enables the app to use the public directory 
app.use(express.static("public"));

/** Decode Form URL Encoded data */
app.use(express.urlencoded());

// used for testing purposes 
app.listen(port, () =>
{
	console.log(`Example app listening on port ${port}`)
})

