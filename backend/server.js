const express = require('express');
const cors = require('cors');
require('dotenv').config();

const feedbackRoutes = require('./routes/feedback');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - Allow all origins for now (we'll fix this after deployment)
app.use(cors());

// Or for more specific CORS (use this if above doesn't work):
// app.use(cors({
//   origin: true, // Allow all origins
//   credentials: true
// }));

app.use(express.json());

app.use('/api/feedback', feedbackRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Student Feedback API' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});