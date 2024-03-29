PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

-- ARTICLES TABLE--
CREATE TABLE IF NOT EXISTS articles_db 
(
	article_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
	subtitle TEXT NOT NULL, 
	text TEXT NOT NULL,
	date_published TEXT, 
	date_modified TEXT, 
	number_of_likes INT
);

-- DRAFTS TABLE--
CREATE TABLE IF NOT EXISTS drafts_db 
(
	draft_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
	subtitle TEXT NOT NULL, 
	text TEXT NOT NULL,
	date_published TEXT, 
	date_modified TEXT, 
	number_of_likes INT
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
	date_published TEXT NOT NULL,
	comment_id INTEGER NOT NULL REFERENCES articles_db (article_id)
	ON DELETE CASCADE
);

-- CREATE PUBLISHED ARTICLES --
INSERT INTO articles_db (title, subtitle, text, date_published, date_modified, number_of_likes)
VALUES('In the Mountains', 'The Start', 'I do not know where I am.', '2010-11-11', '2016-02-13', 0);

INSERT INTO articles_db (title, subtitle, text, date_published, date_modified, number_of_likes)
VALUES('Up the Mountains', 'Lost', 'I still do not know where I am.', '2009-05-01','2021-03-14', 0);

-- CREATE DRAFT ARTICLES --
INSERT INTO drafts_db (title, subtitle, text, date_published, date_modified, number_of_likes)
VALUES('Near the Mountains', 'Where am I?', 'I am lost', '2003-11-06', '2011-09-11', 0);

INSERT INTO drafts_db (title, subtitle, text, date_published, date_modified, number_of_likes)
VALUES('Lost in the Mountains', 'Where is my map?', 'I have lost my map.', '2001-03-13','2005-06-10', 0);

-- CREATE CURRENT AUTHOR SETTINGS
INSERT INTO blog_settings_db (title, subtitle, author)
VALUES('Lost in the Mountains', 'Tales of a Wandering Samurai', 'Kenshin Himura');

-- CREATE SOME USER COMMENTS --
INSERT INTO comments_db (text, author, date_published, comment_id)
VALUES('Awesome', 'Akita', '2002-03-29', 1);

INSERT INTO comments_db (text, author, date_published, comment_id)
VALUES('Still awesome', 'Kaoru', '2015-12-05', 2);

COMMIT;

