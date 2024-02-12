const sqlite3 = require('sqlite3').verbose();
dbPath = "./data/machines.sqlite3";
// Create a new database file or open an existing one
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      console.error('Error opening database', err.message);
    } else {
      console.log('Connected to the SQLite database.');
    }
  });

db.run(`CREATE TABLE IF NOT EXISTS machines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productNumber TEXT NOT NULL,
    description TEXT NOT NULL
    )`, (err) => {
    if (err) {
      console.error('Error creating table', err.message);
    } else {
      console.log('Table created or already exists.');
    }
  });

module.exports = db;