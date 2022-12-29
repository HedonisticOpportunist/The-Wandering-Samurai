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
		const sql = "SELECT * FROM articles_db ORDER BY date_published DESC";
		global.db.all(sql, function (err, rows) 
		{
			if (err)
			{
				next(err); //send the error on to the error handler
			} 
			else 
			{
				// render the homepage with the data retrieved from the query 
				res.render("index.ejs", {articles: rows}); 
			}
		});
	});
	
	app.get("/read", (req, res, next) => 
	{
		res.render("read.ejs");
	});
}