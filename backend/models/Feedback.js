const db = require('../config/database');

class Feedback {
  static getAll(callback) {
    const query = `SELECT * FROM Feedback ORDER BY createdAt DESC`;
    db.all(query, [], callback);
  }

  static create(feedback, callback) {
    const { studentName, courseCode, comments, rating } = feedback;
    const query = `
      INSERT INTO Feedback (studentName, courseCode, comments, rating)
      VALUES (?, ?, ?, ?)
    `;
    db.run(query, [studentName, courseCode, comments, rating], callback);
  }

  static delete(id, callback) {
    const query = `DELETE FROM Feedback WHERE id = ?`;
    db.run(query, [id], callback);
  }
}

module.exports = Feedback;