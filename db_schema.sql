
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS articles_db 
(
	article_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
	subtitle TEXT NOT NULL, 
	text TEXT NOT NULL, 
	date_published TEXT NOT NULL, 
	number_of_likes INT NOT NULL
);

--create your tables with SQL commands here (watch out for slight syntactical differences with SQLite)

CREATE TABLE IF NOT EXISTS testUsers (
    test_user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS testUserRecords (
    test_record_id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_record_value TEXT NOT NULL,
    test_user_id  INT, --the user that the record belongs to
    FOREIGN KEY (test_user_id) REFERENCES testUsers(test_user_id)
);

--insert default data (if necessary here)

INSERT INTO testUsers ("test_name") VALUES ("Simon Star");
INSERT INTO testUserRecords ("test_record_value", "test_user_id") VALUES( "Lorem ipsum dolor sit amet", 1); --try changing the test_user_id to a different number and you will get an error

INSERT INTO articles_db (article_id, title, subtitle, date_published, number_of_likes)
VALUES('In the Mountains', 'The Start', 'I do not know where I am', '11-01-2001', 0);

INSERT INTO articles_db (article_id, title, subtitle, date_published, number_of_likes)
VALUES('Up the Mountains', 'Lost', 'I still do not know where I am', '12-01-2001', 0);

COMMIT;

