const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");

const dataBase = require("./db");

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post("/api/register", (req, res) => {
  const { username, email, password } = req.body;
  dataBase.run(
    `INSERT INTO users (username, email, password)
    VALUES (username, email, password)`,
    function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      } else {
        res.json({ id: this.lastID, username, email });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
});
