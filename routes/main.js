// The main.js file of your application
module.exports = function (app) 
{
	/** AUTHOR */
	
    // Author - Home Page:
    app.get("/author-homepage", function (req, res) 
	{
        res.render("author-homepage.ejs");
    });
	
	// Author - Settings Page:
	app.get("/settings", function (req, res)
	{
		res.render("settings.ejs");
	});
	
	// Author - Edit Article Page:
    app.get("/reader/edit-article", function (req, res) 
	{
        res.render("edit-article.ejs");
    });
	
	/** READER */
	
	// Reader - Home Page:
	app.get("/", function (req, res)
	{
		res.render("index.ejs");
	}); 
	
	// Reader - Article Page: 
	app.get("/load-article", function (req, res)
	{
		res.render("load-article.ejs."); 
	});
}