//file: server.js
// USAFA CS 364 
// Lesson 27 Authentication example
 
const express = require("express");
const crypto = require('crypto');
const session = require("express-session");
const pool = require('./db');
const auth = require("./auth");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false} // would be set to true if using HTTPS
  })
);

// Route handler for GET /
app.get('/', (req, res) => {
  const currentTime = new Date().toString();
  res.send(`Current server time: ${currentTime}`);
});

// Route handler for GET /api/
app.get('/api/', (req, res) => {
  const currentTime = new Date().toString();
  res.send(`Current API time: ${currentTime}`);
});


// app.post("/api/register", auth.register);

const saltRounds = 10;


app.post("/api/register", async (req, res) => {

  console.log("server.js: register ");
  const { firstName, lastName, username, email, password, role } = req.body;

  console.log(`server.js: register firstName: ${firstName}`);
  console.log(`server.js: register lastName: ${lastName}`);
  console.log(`server.js: register username: ${username}`);
  console.log(`server.js: register email: ${email}`);
  console.log(`server.js: register password: ${password}`);
  console.log(`server.js: register role: ${role}`);

  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");

  const query = 'INSERT INTO users (firstName, lastName, email, username, hash, salt, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id';
  const values = [firstName, lastName, email, username, hash, salt, role];
  console.log("trying query with these values...");
  console.log(values);

  try {
    const result = await pool.query(query, values);
    console.log("user NOW registered ... going to respond");
    console.log(result);
    res.json({ success: true, message: `${role} account created`, username: `${username}` }); 
  } catch (error) {
    console.log("in catch block of server.js/register");
    console.log(error);
    res.json({ success: false, message: 'Username or email already exists.' });
  }
});

app.post("/api/login", auth.login);

app.post("/api/users/populate", auth.ensureAdmin, async (req, res) => {

  console.log("server.js: populate ");
  const { firstName, lastName, username, email, password, role } = req.body;

  console.log(`server.js: register firstName: ${firstName}`);
  console.log(`server.js: register lastName: ${lastName}`);
  console.log(`server.js: register username: ${username}`);
  console.log(`server.js: register email: ${email}`);
  console.log(`server.js: register password: ${password}`);
  console.log(`server.js: register role: ${role}`);

  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");

  const query = 'INSERT INTO users (firstName, lastName, email, username, hash, salt, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id';
  const values = [firstName, lastName, email, username, hash, salt, role];
  console.log("trying query with these values...");
  console.log(values);

  try {
    const result = await pool.query(query, values);
    console.log("user NOW registered ... going to respond");
    console.log(result);
    res.json({ success: true, message: `${role} account created`, username: `${username}` }); 
  } catch (error) {
    console.log("in catch block of server.js/populate");
    console.log(error);
    res.json({ success: false, message: 'Username or email already exists.' });
  }
});

app.get("/api/users", auth.ensureAdmin, async (req, res) => {
  console.log("in GET /users");
  let limit = parseInt(req.query.limit);
  const result = await pool.query("SELECT firstname, lastname, username, email, role FROM users LIMIT $1", [limit]);
  console.log(`GET /users rows: ${result.rows}`);
  res.json(result.rows);
});

app.delete("/api/users/truncate", auth.ensureAdmin, async (req, res) => {
  try{
  await pool.query("TRUNCATE TABLE users RESTART IDENTITY");
  res.json({ success: true, message: "Table Truncated"});
  }catch (error) {
    console.log(error);
    res.json({ success: false, message: "Table Failed to Truncate"});
  }
});

app.post("/api/workout/populate", auth.ensureAdmin, async (req, res) => {

  console.log("server.js: populate ");
  const {workoutname} = req.body;

  console.log(`server.js: add workout: ${workoutname}`);

  const query = 'INSERT INTO workout (workoutname) VALUES ($1) RETURNING id';
  const values = [workoutname];
  console.log("trying query with these values...");
  console.log(values);

  try {
    const result = await pool.query(query, values);
    console.log("workout NOW added ... going to respond");
    console.log(result);
    res.json({ success: true, message: `Workout added`, workoutname: `${workoutname}` }); 
  } catch (error) {
    console.log("in catch block of server.js/populate");
    console.log(error);
    res.json({ success: false, message: 'Workout already exists.' });
  }
});

app.get("/api/workout", auth.ensureAdmin, async (req, res) => {
  console.log("in GET /workout");
  let limit = parseInt(req.query.limit);
  const result = await pool.query("SELECT workoutname FROM workout LIMIT $1", [limit]);
  console.log(`GET /workout rows: ${result.rows}`);
  res.json(result.rows);
});

app.delete("/api/workout/truncate", auth.ensureAdmin, async (req, res) => {
  try{
  await pool.query("TRUNCATE TABLE workout RESTART IDENTITY");
  res.json({ success: true, message: "Table Truncated"});
  }catch (error) {
    console.log(error);
    res.json({ success: false, message: "Table Failed to Truncate"});
  }
});

app.get("/api/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
});

app.get("/api/session", (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
