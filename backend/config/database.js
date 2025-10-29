const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

// Use different database paths for different environments
let dbPath;

if (process.env.NODE_ENV === 'production') {
  // For Render, use /tmp directory which is writable
  dbPath = '/tmp/feedback.db';
} else {
  // For local development
  dbPath = process.env.DB_PATH || './feedback.db';
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
    initializeDatabase();
  }
});

function initializeDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      studentName TEXT NOT NULL,
      courseCode TEXT NOT NULL,
      comments TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Feedback table ready.');
    }
  });
}

module.exports = db;