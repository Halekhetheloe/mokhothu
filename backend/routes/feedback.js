const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.get('/', (req, res) => {
  Feedback.getAll((err, rows) => {
    if (err) {
      console.error('Error fetching feedback:', err);
      return res.status(500).json({ error: 'Failed to fetch feedback' });
    }
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { studentName, courseCode, comments, rating } = req.body;

  if (!studentName || !courseCode || !comments || !rating) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  const feedback = { studentName, courseCode, comments, rating };

  Feedback.create(feedback, function(err) {
    if (err) {
      console.error('Error creating feedback:', err);
      return res.status(500).json({ error: 'Failed to create feedback' });
    }
    res.status(201).json({
      id: this.lastID,
      message: 'Feedback submitted successfully'
    });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Feedback.delete(id, function(err) {
    if (err) {
      console.error('Error deleting feedback:', err);
      return res.status(500).json({ error: 'Failed to delete feedback' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.json({ message: 'Feedback deleted successfully' });
  });
});

module.exports = router;