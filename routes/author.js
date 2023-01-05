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
	* c) articles that are currently in draft ordered by their publication date 
	* INPUTS:
	* the router url, the request and the response
	* OUTPUTS:
	* A rendered page that displays a list of articles and drafts 
	**/
	app.get('/author-homepage', runAsyncWrapper(async(req, res) => 
	{
		// retrieve the blog-related details stored in the database 
		const blogDetailsQuery = "SELECT * FROM blog_settings_db";
		let detailRows = await queryDatabase(blogDetailsQuery);
		
		// retrieve the currently published articles stored in the database 
		const articleQuery = "SELECT * FROM articles_db ORDER BY date_published DESC";
		let articleRows = await queryDatabase(articleQuery);
		
		// retrieve articles from the drafts table 
		const draftQuery = "SELECT * FROM drafts_db ORDER BY date_published DESC";
		let draftRows = await queryDatabase(draftQuery);
		
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
	* b) a draft retrieved by its id  
	* INPUTS:
	* the router url, the request and the response
	* OUTPUTS:
	* A rendered page that displays a draft 
	**/
	app.get("/edit-draft/:id", runAsyncWrapper(async(req, res) => 
	{
		// retrieve the blog-related details stored in the database 
		const blogDetailsQuery = "SELECT * FROM blog_settings_db";
		let detailRows = await queryDatabase(blogDetailsQuery);
		
		let id = req.params.id; // Get the required id 
		
		// retrieve any draft that matches that selected id 
		let draftIdQuery = `SELECT * FROM drafts_db WHERE draft_id=${id}`; 
		let draftRows = await queryDatabase(draftIdQuery);
		
		// render the author's edit draft article page with the blog details as well 
		// as the data retrieved from the query 
		res.render("edit-draft.ejs", { details: detailRows, drafts: draftRows });
	}))	
	
	/**
	* PURPOSE:
	* The following get route retrieves:  
	* a) title, subtile and author of the blog 
	* b) an article retrieved by its id  
	* INPUTS:
	* the router url, the request and the response
	* OUTPUTS:
	* A rendered page that displays an article  
	**/
	app.get("/edit/:id", runAsyncWrapper(async(req, res) => 
	{
		// retrieve the blog-related details stored in the database 
		const blogDetailsQuery = "SELECT * FROM blog_settings_db";
		let detailRows = await queryDatabase(blogDetailsQuery);
		
		let id = req.params.id; // Get the required id 
		
		// retrieve any draft that matches that selected id 
		let idQuery = `SELECT * FROM articles_db WHERE article_id=${id}`; 
		let articleRows = await queryDatabase(idQuery);
		
		// render the author's eidt article page with the blog details as well 
		// as the data retrieved from the query 
		res.render("edit.ejs", { details: detailRows, articles: articleRows });
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
		// Get the params from the ejs template to populate to create a new draft
		let articleTitle = req.body["title"];
		let subtitle = req.body["subtitle"];
		
		let text = req.body["text"];
		let date_published = req.body["date_published"];
		
		let date_modified = req.body["date_modified"];
		let number_of_likes = Number(req.body["number_of_likes"]);
		
		// Insert the new article into the database 
		let insertDraftQuery = `INSERT INTO drafts_db (title, subtitle, text, date_published, date_modified, number_of_likes) VALUES("${articleTitle}", "${subtitle}", "${text}", "${date_published}", "${date_modified}", ${number_of_likes});`;
		await queryDatabase(insertDraftQuery);
		
		// Get the most recently inserted primary key 
		let idQuery = "SELECT MAX(draft_id) FROM drafts_db LIMIT 1";
		let idRows = await queryDatabase(idQuery);
		let id = idRows[0]["MAX(draft_id)"];
		
		// Reload the current article edit page   
		res.redirect(`edit-draft/${id}`); 
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
		let deleteQuery = `DELETE FROM articles_db WHERE article_id=${id}`; 
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
		// Get the draft id   
		let id = Number(req.body["draft_id"]);
		
		// Get the draft 
		let selectQuery = `SELECT * FROM drafts_db WHERE draft_id=${id}`; 
		let rows = await queryDatabase(selectQuery);
		
		// Get the params from select query rows 
		let title = rows[0]["title"];
		let subtitle = rows[0]["subtitle"];
		
		let text = rows[0]["text"];
		let date_published = rows[0]["date_published"];
		
		let date_modified = rows[0]["date_modified"];
		let number_of_likes = rows[0]["number_of_likes"];
		
		// Delete the draft from the drafts table 
		let publishQuery = `DELETE FROM drafts_db WHERE draft_id=${id}`; 
		await queryDatabase(publishQuery);
		
		// Insert the draft article into the articles table
		let insertArticleQuery = `INSERT INTO articles_db (title, subtitle, text, date_published, date_modified, number_of_likes) VALUES("${title}", "${subtitle}", "${text}", "${date_published}", "${date_modified}", ${number_of_likes});`;
		await queryDatabase(insertArticleQuery);
		
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
		res.redirect("/author-homepage");
	}))	
	
	/**
	* The following post request: 
	* a) Updates a draft article
	* b) Reloads the page with the newly updated draft details
	* INPUTS: 
	* The router url, the request and the response
	* OUTPUTS:
	* A reloaded page that displays the recently updated draft 
	**/
	app.post("/edit-draft/change-draft", runAsyncWrapper(async(req, res) => 
	{
		// Get the params from the ejs template to populate to update the draft
		let articleTitle = req.body["title"];
		let subtitle = req.body["subtitle"];
		
		let text = req.body["text"];
		let date_published = req.body["date_published"];
		
		let date_modified = req.body["date_modified"];
		let number_of_likes = Number(req.body["number_of_likes"]);
		
		// Insert the new draft into the database 
		let updateDraftQuery = `UPDATE drafts_db SET title="${articleTitle}", subtitle="${subtitle}", text="${text}", date_published="${date_published}", date_modified="${date_modified}", number_of_likes=${number_of_likes};`;
		await queryDatabase(updateDraftQuery);
		
		// Reload the edit draft page  
		res.redirect(req.get('referer'))
	}))	
	
	/**
	* The following post request: 
	* a) Updates an article
	* b) Reloads the page with the newly updated article details
	* INPUTS: 
	* The router url, the request and the response
	* OUTPUTS:
	* A reloaded page that displays the recently updated article 
	**/
	app.post("/edit/change-article", runAsyncWrapper(async(req, res) => 
	{
		// Get the params from the ejs template to populate to update the article
		let articleTitle = req.body["title"];
		let subtitle = req.body["subtitle"];
		
		let text = req.body["text"];
		let date_published = req.body["date_published"];
		
		let date_modified = req.body["date_modified"];
		let number_of_likes = Number(req.body["number_of_likes"]);
		
		// Update the draft
		let updateArticleQuery = `UPDATE articles_db SET title="${articleTitle}", subtitle="${subtitle}", text="${text}", date_published="${date_published}", date_modified="${date_modified}", number_of_likes=${number_of_likes};`;
		await queryDatabase(updateArticleQuery);
		
		// Reload the edit draft page  
		res.redirect(req.get('referer'))
	}))	
}
	