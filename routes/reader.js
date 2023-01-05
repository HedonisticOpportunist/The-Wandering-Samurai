require('./helpers.js')(); 
const bodyParser =  require('body-parser');

module.exports = function(app)
{
	///// READER ROUTES /////
	
	// GET ROUTES //
	
	/**
	* PURPOSE:
	* The following get route retrieves:  
	* a) Title, subtile and author of the blog 
	* b) The currently published articles ordered by their publication date 
	* INPUTS:
	* The router url, the request and the response
	* OUTPUTS:
	* A rendered page that displays a list of articles 
	**/
	app.get('/', runAsyncWrapper(async(req, res) => 
	{
		// retrieve the blog-related details stored in the database 
		const blogDetailsQuery = "SELECT * FROM blog_settings_db";
		let detailRows = await queryDatabase(blogDetailsQuery);
		
		// retrieve the currently published articles stored in the database 
		const articleQuery = "SELECT * FROM articles_db WHERE status = 'Published' ORDER BY date_published DESC";
		let articleRows = await queryDatabase(articleQuery);
		
		// render the reader home page with tbe blog details and articles 
		res.render("homepage.ejs", { details: detailRows, articles : articleRows });
	}))
	
	/**
	* PURPOSE:
	* The following get route retrieves:  
	* a) An article based on its id
	* b) Any previous comments posted by readers 
	* INPUTS: 
	* The router url, the request and the response 
	* OUTPUTS:
	* A rendered page that displays a single article 
	**/
	app.get("/read/:id", runAsyncWrapper(async(req, res) => 
	{
		// retrieve the blog-related details stored in the database 
		const blogDetailsQuery = "SELECT * FROM blog_settings_db";
		let detailRows = await queryDatabase(blogDetailsQuery);
		
		let articleId = req.params.id; // Get the required id 
		
		// retrieve any article that matches that selected id 
		let idQuery = `SELECT * FROM articles_db WHERE article_id=${articleId}`; 
		let selectedRows = await queryDatabase(idQuery);
		
		// retrieve the previous comments stored in the database for the specific article 
		const commentsQuery = `SELECT * FROM comments_db WHERE comment_id=${articleId} ORDER BY date_published DESC`; 
		let commentRows = await queryDatabase(commentsQuery);
		
		// render the reader's article page with the blog details, the previous reader comments 
		// as well as the article data retrieved from the query 
		res.render("read.ejs", { details: detailRows, articles: selectedRows, comments : commentRows });
	}))	
	
	// POST ROUTES //
	
	// support parsing of application/json type post data
	app.use(bodyParser.json());
	
	//support parsing of application/x-www-form-urlencoded post data
	app.use(bodyParser.urlencoded({ extended: true }));
	
	/**
	PURPOSE:
	* The following post request: 
	* a) Adds a comment 
	* b) Reloads the page with most reent comment 
	* INPUTS: 
	* The router url, the request and the response
	* OUTPUTS:
	* A reloaded page that displays the article with a new comment  
	**/
	app.post("/read/comments", runAsyncWrapper(async(req, res) => 
	{
		// Get the params from the ejs template to populate the comment table 
		let id = Number(req.body["article_id"]);
		let comment = req.body["textComment"];
		
		let commentAuthor = req.body["author"];
		let commentDate = req.body["date_published"];
		
		// Insert the new comment into the database 
		let sqlQuery = `INSERT INTO comments_db (text, author, date_published, comment_id) VALUES("${comment}", "${commentAuthor}", "${commentDate}", ${id});`;
		await queryDatabase(sqlQuery);
		
		// Reload the current article reader's page   
		res.redirect(req.get('referer'));
	}))	
	
	/**
	* PURPOSE: 
	* The following post request: 
	* a) Gets the current number of likes for a specific article 
	* b) Updates the number of likes for said article
	* c) Refreshes the page to display the updated number of likes 
	* INPUTS: 
	* The router url, the request and the response
	* OUTPUTS:
	* A reloaded page that displays the article with updated likes 
	**/
	app.post("/read/number_of_likes", runAsyncWrapper(async(req, res) => 
	{
		// Get the current article id from the request body
		let id = Number(req.body["article_id"]);
		
		// Query the articles table for the current number of likes for a specific article 
		let query = `SELECT number_of_likes FROM articles_db where article_id=${id}`; 
		let rows = await queryDatabase(query);
		
		// Get the actual integer value from the rows returned by the query 
		let count = rows[0]['number_of_likes'];
		let updatedCount = count + 1; // incrememnt the current number of likes by one 
		
		// Update the articles table for that specific article in regards to its number of likes 
		let postQuery = `UPDATE articles_db SET number_of_likes = ${updatedCount} WHERE article_id=${id}`; 
		await queryDatabase(postQuery);
		
		// Reload the current article reader's page   
		res.redirect(req.get('referer'));
	}))
}