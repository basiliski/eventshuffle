DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS dates;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;

-- Create events table
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

-- Create dates table
CREATE TABLE dates (
    id SERIAL PRIMARY KEY,
    event_id INT,
    date DATE,
    FOREIGN KEY (event_id) REFERENCES events(id)
);

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

-- Create votes table
CREATE TABLE votes (
    id SERIAL PRIMARY KEY,
    user_id INT,
    date_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (date_id) REFERENCES dates(id)
);