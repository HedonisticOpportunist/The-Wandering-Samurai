require('./helpers.js')(); 
const bodyParser =  require('body-parser');

module.exports = function(app)
{
	///// READER ROUTES /////
	
	// GET ROUTES //
	
	/**
	* The following routes retrieves:  
	* a) title, subtile and author of the blog 
	* b) the currently published articles ordered by publication date 
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
		res.render("homepage.ejs", {details: detailRows, articles : articleRows});
	}))
	
	/**
	* The following routes retrieves:  
	* a) An article based on its id
	* b) any previous comments posted by readers 
	**/
	app.get("/read/:id", runAsyncWrapper(async(req, res) => 
	{
		// retrieve the blog-related details stored in the database 
		const blogDetailsQuery = "SELECT * FROM blog_settings_db";
		let detailRows = await queryDatabase(blogDetailsQuery);
		
		let id = req.params.id; // Get the required id 
		
		// retrieve any article that matches that selected id 
		let idQuery = `SELECT * FROM articles_db WHERE article_id= ${id}`; 
		let selectedRows = await queryDatabase(idQuery);
		
		// retrieve the blog-related details stored in the database 
		const commentsQuery = `SELECT * FROM comments_db WHERE comment_id= ${id} ORDER BY date_published`; 
		let commentRows = await queryDatabase(commentsQuery);
		
		// render the reader's article page with the blog details, the previous reader comments 
		// as well as the article data retrieved from the query 
		res.render("read.ejs", {details: detailRows, articles: selectedRows, comments : commentRows});
	}))	
	
	// POST ROUTES //
	
	// support parsing of application/json type post data
	app.use(bodyParser.json());
	
	//support parsing of application/x-www-form-urlencoded post data
	app.use(bodyParser.urlencoded({ extended: true }));
	
	/**
	* Add a comment and reload the page 
	**/
	app.post("/read/comments", runAsyncWrapper(async(req, res) => 
	{
		console.log(req);
		res.send("Comment posted");
	}))	
	
	/**
	* Update the number of likes on an article 
	**/
	app.post("/read/likes", runAsyncWrapper(async(req, res) => 
	{
		console.log(req.body);
		res.send("Likes updated.");
		//let id = req.params.id; // Get the required id 
		
		// Select the current number of likes for the specific article 
		//let count = `SELECT number_of_likes FROM articles_db WHERE article_id= ${id}`; 
		//let updatedCount = count + 1; // incrememnt the current number of likes by one 
		
		//console.log(updatedCount);
		
		// retrieve any article that matches that selected id 
		//let idQuery = `UPDATE articles_db SET number_likes = ${updatedCount} WHERE article_id= ${id}`; 
		//let selectedRows = await queryDatabase(idQuery);
		
		// render the reader's article page with the blog details as well 
		// as the data retrieved from the query 
		//res.render("read.ejs", {details: detailRows, articles: selectedRows});
	}))
}