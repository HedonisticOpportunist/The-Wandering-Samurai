/**
 * The following routes are used to display the reader-related pages 
 **/
module.exports = function (app) 
{

	/**
	* @desc 
	* Retrieves the current published articles ordered by publication date
	**/
	app.get("/", (req, res, next) => 
	{
		let query = "SELECT * FROM articles_db WHERE status = 'Published' ORDER BY date_published DESC";
		
		global.db.all(query, function (err, rows) // hanlde the query 
		{
			if (err)
			{
				next(err); //send the error on to the error handler
			} 
			else 
			{
				// render the homepage with the data retrieved from the query 
				res.render("homepage.ejs", {articles: rows}); 
			}
		});
	});
	
/**
 * Retrieves an article based on its by id
 **/
	
	app.get("/read/:id", (req, res, next) => 
	{
		let id = req.params.id; // Get the required id 
		let query = `SELECT * FROM articles_db WHERE article_id= ${id}`; 
		
		global.db.all(query, function (err, rows) // hanlde the query 
		{
			if (err)
			{
				next(err); //send the error on to the error handler
			} 
			else 
			{
				// render the reader's article page with the data retrieved from the query 
				res.render("read.ejs", {articles: rows});
			}
		});
	});
	
}