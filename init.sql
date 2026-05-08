-- taking the easy way: use the default database: postgres
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) NOT NULL,
    hash CHAR(128) NOT NULL,
    salt CHAR(32) NOT NULL,
    role VARCHAR(10) CHECK (role IN ('user', 'admin')) NOT NULL DEFAULT 'user'
);

select * from users;

CREATE TABLE IF NOT EXISTS workout (
    id SERIAL PRIMARY KEY,
    workoutname VARCHAR(100) NOT NULL UNIQUE
);

select * from workout;

CREATE TABLE IF NOT EXISTS exercise (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    workoutname VARCHAR(100) NOT NULL,
    numSets INT,
    reps INT,
    numWeight INT,
    dtg TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (workoutname) REFERENCES workout(workoutname)
);

select * from exercise;

