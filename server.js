const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

// In-memory data (reset on server restart)
let games = [];

// Middleware
app.use(cors());
app.use(express.json());

// Serve index.html and static files
app.use(express.static(__dirname));

// API: Get all games
app.get('/api/games', (req, res) => {
  res.json(games);
});

// API: Post a new game
app.post('/api/games', (req, res) => {
  const { name, code, author } = req.body;
  if (!name || !code || !author) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const game = { id: games.length, name, code, author };
  games.push(game);
  res.json(game);
});

// Fallback: always serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});






