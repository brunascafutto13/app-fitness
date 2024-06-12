const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar cors
const db = require('./config/db.config.js');
const app = express();

// Configurações CORS para funcionar o front
const corsOptions = {
  origin: 'http://localhost:3000', // Endereço do front
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions)); // Usar cors com opções

// Test Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the backend API.' });
});

// Define routes
const router = require('./routes/auth.routes.js');
app.use('/api/auth', router);

// Set Port and Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
