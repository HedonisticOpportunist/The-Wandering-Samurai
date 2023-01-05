require('./helpers.js')(); 
const bodyParser =  require('body-parser');

module.exports = function (app) 
{
	///// AUTHOR ROUTES /////
	
	// GET ROUTES //
	
	/**
	* PURPOSE:
	* The following get route retrieves:  
	* a) title, subtile and author of the blog 
	* b) the currently published articles ordered by their publication date 
	* c) any articles that are in draft mode ordered by their publication date 
	* INPUTS:
	* the router url, the request and the response
	* OUTPUTS:
	* A rendered page that displays a list of articles 
	**/
	app.get('/author-homepage', runAsyncWrapper(async(req, res) => 
	{
		// retrieve the blog-related details stored in the database 
		const blogDetailsQuery = "SELECT * FROM blog_settings_db";
		let detailRows = await queryDatabase(blogDetailsQuery);
		
		// retrieve the currently published articles stored in the database 
		const articleQuery = "SELECT * FROM articles_db WHERE status = 'Published' ORDER BY date_published DESC";
		let articleRows = await queryDatabase(articleQuery);
		
		// retrieve articles that are draft mode from the database 
		const draftQuery = "SELECT * FROM articles_db WHERE status = 'Draft' ORDER BY date_published DESC";
		let draftRows = await queryDatabase(articleQuery);
		
		// render the reader home page with tbe blog details and articles 
		res.render("author-homepage.ejs", { details: detailRows, articles : articleRows, drafts: draftRows });
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
	* PURPOSE:
	* The following get route retrieves:  
	* a) title, subtile and author of the blog 
	* b) an article retrieved by its id  
	* INPUTS:
	* the router url, the request and the response
	* OUTPUTS:
	* A rendered page that displays a list of articles 
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
		res.render("edit.ejs", { details: detailRows, articles: selectedRows });
	}))	
	
	// POST ROUTES //
	
	// support parsing of application/json type post data
	app.use(bodyParser.json());
	
	//support parsing of application/x-www-form-urlencoded post data
	app.use(bodyParser.urlencoded({ extended: true }));
	
	/**
	* PURPOSE:
	* The following post route creates:  
	* a) A new draft article
	* b) Retrieves the primary key for the draft article
	* INPUTS:
	* The router url, the request and the response
	* OUTPUTS:
	* A rendered page that displays the newly created draft article  
	**/
	app.post("/create-draft-article", runAsyncWrapper(async(req, res) => 
	{
		// Get the params from the ejs template to populate to create a new article
		let articleTitle = req.body["title"];
		let subtitle = req.body["subtitle"];
		
		let text = req.body["text"];
		let status = req.body["status"];
		 
		// Insert the new article into the database 
		let sqlQuery = `INSERT INTO articles_db (title, subtitle, text, status) VALUES("${articleTitle}", "${subtitle}", "$text", "${status}");`;
		await queryDatabase(sqlQuery);
		
		// Get the most recently inserted primary key 
		let idQuery = "SELECT MAX(article_id) FROM articles_db LIMIT 1";
		let idRows = await queryDatabase(idQuery);
		let id = idRows[0]["MAX(article_id)"];
		
		// Reload the current article edit page   
		res.redirect(`edit/${id}`); 
	}))	
	
	/**
	* The following post request: 
	* a) Deletes a published article
	* b) Reloads the page with most recently published articles
	* INPUTS: 
	* The router url, the request and the response
	* OUTPUTS:
	* A reloaded page that no longer displays deleted articles 
	**/
	app.post("/delete-article", runAsyncWrapper(async(req, res) => 
	{
		// Get the article id   
		let id = Number(req.body["article_id"]);
		
		// Delete the article from the articles table
		let deleteQuery = `DELETE FROM articles_db WHERE article_id= ${id}`; 
		await queryDatabase(deleteQuery);
		
		// Reload the current author's homepage   
		res.redirect(req.get('referer'));
	}))	
	
	/**
	* The following post request: 
	* a) Publishes an article in draft mode
	* b) Reloads the page with the newly published articles
	* INPUTS: 
	* The router url, the request and the response
	* OUTPUTS:
	* A reloaded page that displays the recently published articles 
	**/
	app.post("/publish-article", runAsyncWrapper(async(req, res) => 
	{
		// Get the article id   
		let id = Number(req.body["article_id"]);
		let updatedStatus = 'Published';
		
		// Update the article to have the status of published
		let publishQuery = `UPDATE articles_db SET status="${updatedStatus}" WHERE article_id= ${id}`; 
		await queryDatabase(publishQuery);
		
		// Reload the current author's homepage   
		res.redirect(req.get('referer'));
	}))	
	
	/**
	* The following post request: 
	* a) Updates the blog details
	* b) Reloads the page with the newly updated blog setting details
	* INPUTS: 
	* The router url, the request and the response
	* OUTPUTS:
	* A reloaded page that displays the recently updated blog settings 
	**/
	app.post("/edit-settings", runAsyncWrapper(async(req, res) => 
	{
		// Query the articles table for the status for a specific article 
		let query = "SELECT * FROM blog_settings_db"; 
		let rows = await queryDatabase(query);
		
		// Get the actual integer value from the rows returned by the query 
		let title = req.body["title"];
		let subtitle = req.body["subtitle"]; 
		let author = req.body["author"];
		
		// Update the article to have the status of published
		let blogQuery = `UPDATE blog_settings_db SET title="${title}", subtitle="${subtitle}", author="${author}"`; 
		await queryDatabase(blogQuery);
		
		// Redirect to the current author's homepage   
		res.redirect("/");
	}))	
	
	/**
	* The following post request: 
	* a) Updates an article
	* b) Reloads the page with the newly updated article details
	* INPUTS: 
	* The router url, the request and the response
	* OUTPUTS:
	* A reloaded page that displays the recently updated blog settings 
	**/
	app.post("/edit/edit-article", runAsyncWrapper(async(req, res) => 
	{
		res.send("Article updated.");
	}))	
}
	