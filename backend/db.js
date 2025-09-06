const sqlite3 = require("sqlite3"); //SQLite3 Database

const db = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.log(`Error opening database: ${err.message}`);
  } else {
    console.log("Connected to SQLite Database.");
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            email TEXT UNIQUE,
            password TEXT UNIQUE
            )`
    );
  }
});
