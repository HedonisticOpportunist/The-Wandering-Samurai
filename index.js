const express = require('express');
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Items in the global namespace are accessible throughout the node application
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

// Routes
require("./routes/author")(app);
require("./routes/reader")(app);

// The views folder 
app.set("views", __dirname + "/views");

// Set the app to use ejs for rendering
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// Enables the app to use the public directory 
app.use(express.static("public"));

// Used for testing purposes 
app.listen(port, () =>
{
	console.log(`Example app listening on port ${port}`)
})

