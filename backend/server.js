// Import required modules
const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();
const port = 3000;

app.use(cors());

// Create a MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "radul123",
  database: process.env.DB_NAME || "dashboard",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Endpoint to fetch users
app.get("/dashboard/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching users");
    }
    res.json(results);
  });
});

// Endpoint to fetch advertisements
app.get("/dashboard/advertisements", (req, res) => {
  db.query("SELECT * FROM advertisements", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching advertisements");
    }
    res.json(results);
  });
});

// Endpoint to fetch news
app.get("/dashboard/news", (req, res) => {
  db.query("SELECT * FROM news", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching news");
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
