const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
require('dotenv').config()

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const citasRoutes = require('./routes/citas');  

const app = express();
const port = 3001;
const secretKey = "your_jwt_secret_key";

// Middleware setup
app.use(bodyParser.json());
app.use(cors());
  
// Database connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database.");
});

// usa la rutas
app.use('/auth', authRoutes(db, secretKey));
app.use('/user', userRoutes(db));
app.use('/citas', citasRoutes(db));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});