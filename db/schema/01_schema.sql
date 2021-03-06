DROP TABLE IF EXISTS polls CASCADE;
DROP TABLE IF EXISTS poll_options CASCADE;
DROP TABLE IF EXISTS user_answers CASCADE;


CREATE TABLE polls (
id SERIAL PRIMARY KEY NOT NULL,
email VARCHAR(255) NOT NULL,
title VARCHAR(255) NOT NULL,
description TEXT,
link VARCHAR(6) NOT NULL,
name_req BOOLEAN DEFAULT FALSE
);

CREATE TABLE poll_options (
id SERIAL PRIMARY KEY NOT NULL,
poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
title VARCHAR(255) NOT NULL,
description TEXT
);

CREATE TABLE user_answers (
id SERIAL PRIMARY KEY NOT NULL,
name VARCHAR(255),
poll_option_id INTEGER REFERENCES poll_options(id) ON DELETE CASCADE,
points INTEGER NOT NULL
);

