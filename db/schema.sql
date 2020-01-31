DROP DATABASE burger_db;

CREATE DATABASE burger_db;

USE burger_db;

CREATE TABLE burgers (
	id int NOT NULL AUTO_INCREMENT,
	name varchar(200) NOT NULL,
	eaten BOOLEAN DEFAULT false,
    vomit_amt INT(5) NOT NULL,
	PRIMARY KEY (id)
);


