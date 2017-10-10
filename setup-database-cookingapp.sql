CREATE TABLE users (
  users_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  profile_pic TEXT,
  password_hash CHAR(60) NOT NULL
);

CREATE TABLE recipes (
  recipes_id SERIAL PRIMARY KEY,
  fork2food_id TEXT NOT NULL,
  title TEXT NOT NULL,
  social_rank NUMERIC,
  img TEXT NOT NULL,
  url TEXT NOT NULL
);

CREATE TABLE users_recipes (
	users_id int REFERENCES users (users_id) ON UPDATE CASCADE ON DELETE CASCADE,
	recipes_id int REFERENCES recipes (recipes_id) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY (users_id, recipes_id)
);

