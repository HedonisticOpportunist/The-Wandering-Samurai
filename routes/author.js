require('./helpers.js')(); 

module.exports = function (app) 
{
	///// AUTHOR ROUTES /////
	
	/**
	* The following route retrieves:  
	* a) title, subtile and author of the blog 
	* b) the currently published articles ordered by publication date 
	**/
	app.get('/author-homepage', runAsyncWrapper(async(req, res) => 
	{
		// retrieve the blog-related details stored in the database 
		const blogDetailsQuery = "SELECT * FROM blog_settings_db";
		let detailRows = await queryDatabase(blogDetailsQuery);
		
		// retrieve the currently published articles stored in the database 
		const articleQuery = "SELECT * FROM articles_db WHERE status = 'Published' ORDER BY date_published DESC";
		let articleRows = await queryDatabase(articleQuery);
		
		// render the reader home page with tbe blog details and articles 
		res.render("author-homepage.ejs", {details: detailRows, articles : articleRows});
	}))
	
	/**
	* The following route retrieves: title, subtile and author of the blog 
	* these are populated in the ejs template of the route 
	**/
	app.get('/settings', runAsyncWrapper(async(req, res) => 
	{
		// retrieve the blog-related details stored in the database 
		const blogDetailsQuery = "SELECT * FROM blog_settings_db";
		let detailRows = await queryDatabase(blogDetailsQuery);
		
		// render the reader home page with tbe blog details and articles 
		res.render("settings.ejs", {details: detailRows});
	}))
	
	/**
	* Retrieves an article to be edited based on its id
	**/
	app.get("/edit/:id", runAsyncWrapper(async(req, res) => 
	{
		// retrieve the blog-related details stored in the database 
		const blogDetailsQuery = "SELECT * FROM blog_settings_db";
		let detailRows = await queryDatabase(blogDetailsQuery);
		
		let id = req.params.id; // Get the required id 
		
		// retrieve any article that matches that selected id 
		let idQuery = `SELECT * FROM articles_db WHERE article_id= ${id}`; 
		let selectedRows = await queryDatabase(idQuery);
		
		 
		// render the reader's article page with the blog details as well 
		// as the data retrieved from the query 
		res.render("edit.ejs", {details: detailRows, articles: selectedRows});
	}))	
	
	app.post("/create-draft-article", runAsyncWrapper(async(req, res) => 
	{
		res.send("Article sent."); 
	}))	
}
	