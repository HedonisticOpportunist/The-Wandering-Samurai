///// HELPER FUNCTIONS /////
module.exports = function()
{
	/**
	* A function that handles queries and waits for them
	* to be resolved 
	* @Credit https://stackoverflow.com/questions/64372255/how-to-use-async-await-in-sqlite3-db-get-and-db-all
	**/
	this.queryDatabase = async function(query)
	{
		return new Promise(function(resolve, reject)
		{
			db.all(query, function(err,rows)
			{
				if(err)
				{
					return reject(err);
				}
			
				resolve(rows);
			});
		});
	}
	
	/**
	* A wrapper function for a handler that uses async
	* @Credit: https://zellwk.com/blog/async-await-express/
	**/
	this.runAsyncWrapper = function(callback) 
	{
		return function (req, res, next) 
		{
			callback(req, res, next)
			.catch(next)
		}
	}	
}

	
