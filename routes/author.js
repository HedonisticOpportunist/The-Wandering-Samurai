const express = require("express");
const router = express.Router();
const assert = require('assert');

/**
 * The following routes are used for the reader-related article pages 
 */
  /**
 * @desc retrieves the current user records
 */
router.get("/articles", (req, res, next) => 
{
	const sql = "SELECT * FROM articles_db";
	global.db.all(sql, function (err, rows) 
	{
		if (err) 
		{
			next(err);
		} 
		else
		{
			res.json(rows);
		}
  });
});

module.exports = router;