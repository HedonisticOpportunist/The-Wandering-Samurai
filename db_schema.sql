PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

-- ARTICLES TABLE--
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

-- DETAIL SETTINGS TABLE  --
CREATE TABLE IF NOT EXISTS blog_settings_db 
(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
	subtitle TEXT NOT NULL, 
	author TEXT NOT NULL
);

-- USER COMMENTS TABLE  --
CREATE TABLE IF NOT EXISTS comments_db 
(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
	author TEXT NOT NULL, 
	date_published TEXT NOT NULL
);

-- CREATE ARTICLES --
INSERT INTO articles_db (title, subtitle, text, status, date_published, date_modified, number_of_likes)
VALUES('In the Mountains', 'The Start', 'I do not know where I am', 'Published', '11-01-2001', '11-01-2001', 0);

INSERT INTO articles_db (title, subtitle, text, status, date_published, date_modified, number_of_likes)
VALUES('Up the Mountains', 'Lost', 'I still do not know where I am', 'Published', '12-01-2001','11-01-2001', 0);

-- CREATE CURRENT AUTHOR SETTINGS
INSERT INTO blog_settings_db (title, subtitle, author)
VALUES('Lost in the Mountains', 'Tales of a Wandering Samurai', 'Kenshin Himura');

-- CREATE SOME USER COMMENTS --
INSERT INTO comments_db (text, author, date_published)
VALUES('Awesome', 'Akita', '11-01-2002');

INSERT INTO comments_db (text, author, date_published)
VALUES('Still awesome', 'Kaoru', '11-01-2003');

COMMIT;

