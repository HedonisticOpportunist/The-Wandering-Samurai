// The main.js file of your application
module.exports = function (app) 
{
	/** AUTHOR */
	
    // Author - Home Page:
    app.get("/author", function (req, res) 
	{
        res.render("author.ejs");
    });
	
	// Author - Settings Page:
	app.get("/settings", function (req, res)
	{
		res.render("settings.ejs");
	});
	
	// Author - Edit Article Page:
    app.get("/edit", function (req, res) 
	{
        res.render("edit.ejs");
    });
	
	/** READER */
	
	// Reader - Home Page:
	app.get("/", (req, res) => 
	{
		res.render("index.ejs");
	});

	// Reader - Article Page: 
	app.get("/read", function (req, res)
	{
		res.render("read.ejs."); 
	});
}