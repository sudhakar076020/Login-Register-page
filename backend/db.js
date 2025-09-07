const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "users.db");

let db = null;

const initializeDB = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // create table if not exists
    await db.run(`
      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT
      );
    `);

    console.log("Database initialized and User table ready.");
  } catch (err) {
    console.error(`DB Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = { db, initializeDB };
