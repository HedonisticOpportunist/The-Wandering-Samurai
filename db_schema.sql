
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS articles_db 
(
	article_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
	subtitle TEXT NOT NULL, 
	text TEXT NOT NULL, 
	status TEXT NOT NULL,
	date_published TEXT NOT NULL, 
	date_modified TEXT NOT NULL, 
	number_of_likes INT NOT NULL
);

INSERT INTO articles_db (title, subtitle, text, status, date_published, date_modified, number_of_likes)
VALUES('In the Mountains', 'The Start', 'I do not know where I am', 'Published', '11-01-2001', '11-01-2001', 0);

INSERT INTO articles_db (title, subtitle, text, status, date_published, date_modified, number_of_likes)
VALUES('Up the Mountains', 'Lost', 'I still do not know where I am', 'Published', '12-01-2001','11-01-2001', 0);

COMMIT;

