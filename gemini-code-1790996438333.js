// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow requests from our React frontend
app.use(express.json()); // Parse JSON data sent from the frontend

// In-memory array to store trial requests (Use a database like MongoDB for production)
const leads = [];

// API Route: Handle Contact Form Submission
app.post('/api/contact', (req, res) => {
  const { name, email, phone, goal, message } = req.body;

  // Basic Validation
  if (!name || !phone) {
    return res.status(400).json({ success: false, error: 'Name and Phone number are required.' });
  }

  // Create lead object
  const newLead = {
    id: Date.now(),
    name,
    email,
    phone,
    goal,
    message,
    date: new Date().toLocaleString()
  };

  leads.push(newLead);
  
  console.log('--- New Free Trial Request ---');
  console.log(newLead);
  console.log('------------------------------');

  // Send success response back to React
  res.status(200).json({ 
    success: true, 
    message: 'Trial requested successfully! Our team will call you shortly.' 
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend Server is running on http://localhost:${PORT}`);
});