const express = require("express");
const bcrypt = require("bcrypt");
const  db  = require("./db");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
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

// Login
router.post("/login", async (req, res) => {
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

// Protected Dashboard route
router.get("/dashboard", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const user = await db.get("SELECT username, email FROM user WHERE id = ?", [
    req.session.userId,
  ]);
  res.json({ message: user });
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.send("Logged out successfully!");
});

module.exports = router;
