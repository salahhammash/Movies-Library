DROP TABLE IF EXISTS firstMOV;

CREATE TABLE IF NOT EXISTS firstMOV(
id SERIAL PRIMARY KEY,
title VARCHAR (255),
release_date VARCHAR (255),
poster_path VARCHAR(255),
overview VARCHAR(10000)
);



-- CREATE TABLE IF NOT EXISTS sec(
-- id SERIAL PRIMARY KEY,
-- title VARCHAR (255),
-- release_date VARCHAR (255),
-- poster_path VARCHAR(255),
-- overview VARCHAR(10000)
-- );