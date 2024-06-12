const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/db.config.js');

// Register
router.post('/register', async (req, res) => {
  const { username, password, peso, email } = req.body;
  
  if (!username || !password || !email) {
    return res.status(400).send({ message: 'Please provide all required fields: username, email, and password.' });
  }
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (username, email, password, peso) VALUES (?, ?, ?, ?)`;
    
    db.query(query, [username, email, hashedPassword, peso], (error, results) => {
      if (error) {
        return res.status(500).send({ message: error.message });
      }
      res.status(201).send({ message: 'User registered successfully!' });
    });
  } catch (error) {
    res.status(500).send({ message: 'Error registering user.' });
  }
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log("entrou login")
  if (!email || !password) {
    return res.status(400).send({ message: 'Please provide both email and password.' });
  }

  const query = `SELECT * FROM users WHERE email = ?`;

  db.query(query, [email], async (error, results) => {
    if (error) {
      return res.status(500).send({ message: error.message });
    }

    if (results.length === 0) {
      return res.status(401).send({ message: 'Invalid credentials.' });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).send({ message: 'Invalid credentials.' });
    }

    res.send({ message: 'Login successful!' });
  });
});

// List Users
router.get('/users', (req, res) => {
  const query = `SELECT username, email, peso FROM users`;

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).send({ message: error.message });
    }
    res.status(200).send(results);
  });
});

module.exports = router;
