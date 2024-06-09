const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/clima', { useNewUrlParser: true, useUnifiedTopology: true });

// Definir el esquema del historial de búsqueda
const searchHistorySchema = new mongoose.Schema({
  city: String,
  country: String,
  date: { type: Date, default: Date.now }
});

const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);

// Endpoint para guardar el historial de búsqueda
app.post('/api/search', async (req, res) => {
  try {
    const { city, country } = req.body;
    const newSearch = new SearchHistory({ city, country });
    await newSearch.save();
    res.status(201).json({ message: 'Search saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
