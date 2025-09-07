const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcrypt");

const dbPath = path.join(__dirname, "users.db");
const app = express();

app.use(express.json());

//CORS setup
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

// Session
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

let db = null;

const initializeDBandServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // create table
    await db.run(`
      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT
      );
    `);

    console.log("User table ready");

    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  } catch (error) {
    console.log(`DB error: ${error}`);
    process.exit(1);
  }
};

initializeDBandServer();

// =============================
// Register
// =============================
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password.length < 5) {
      return res.status(400).json({ error: "Password is too short" });
    }

    const dbUser = await db.get("SELECT * FROM user WHERE email = ?", [email]);

    if (dbUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.run(
      "INSERT INTO user (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    return res.json({ message: "User created successfully" });
  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// =============================
// Login
// =============================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const dbUser = await db.get("SELECT * FROM user WHERE email = ?", [email]);

    if (!dbUser) {
      return res.status(400).json({ error: "Invalid user" });
    }

    const isValid = await bcrypt.compare(password, dbUser.password);

    if (!isValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // store session
    req.session.userId = dbUser.id;

    res.json({ message: "Login success!" });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// =============================
// Protected Dashboard route
// =============================
app.get("/dashboard", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const user = await db.get("SELECT username, email FROM user WHERE id = ?", [
    req.session.userId,
  ]);
  res.json({ message: user });
});

// =============================
// Logout route
// =============================
app.post("/logout", (req, res) => {
  req.session.destroy();
  res.send("Logged out successfully!");
});

module.exports = app;
