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
    workoutname VARCHAR(100) NOT NULL,
    username VARCHAR (100) NOT NULL,
    dtg TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY(username, workoutname)
);

CREATE TABLE IF NOT EXISTS exercise (
    username VARCHAR(100) NOT NULL,
    workoutname VARCHAR(100) NOT NULL,
    exercise_name VARCHAR(100) NOT NULL,
    numSets INT,
    reps INT,
    FOREIGN KEY (username, workoutname) REFERENCES workout(username, workoutname)
);

select * from workout;

