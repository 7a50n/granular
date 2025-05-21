const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

let users = {}; // Store sessions in memory

// Generate a pass (QR Code ID)
app.post('/api/create-pass', (req, res) => {
  const userId = uuidv4();
  users[userId] = { clockIn: null, clockOut: null };
  res.json({ userId });
});

// Clock in
app.post('/api/clock-in', (req, res) => {
  const { userId } = req.body;
  if (users[userId]) {
    users[userId].clockIn = new Date();
    res.json({ message: 'Clocked in' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Clock out
app.post('/api/clock-out', (req, res) => {
  const { userId } = req.body;
  if (users[userId] && users[userId].clockIn) {
    users[userId].clockOut = new Date();
    const durationMs = users[userId].clockOut - users[userId].clockIn;
    const durationHours = durationMs / 1000 / 60 / 60;
    res.json({ durationHours });
  } else {
    res.status(404).json({ message: 'User not found or not clocked in' });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
