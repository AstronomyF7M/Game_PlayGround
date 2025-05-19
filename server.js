const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Allow frontend (React or HTML) to access this server
app.use(cors());
app.use(express.json());

// In-memory storage (reset when server restarts)
let users = [];
let games = [];
let comments = [];

// Register
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if(users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'Username already exists' });
  }
  users.push({ username, password });
  res.json({ success: true });
});

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if(!user) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ success: true, username });
});

// Create a game
app.post('/api/games', (req, res) => {
  const { name, code, author } = req.body;
  if(!name || !code || !author) return res.status(400).json({ error: 'Missing fields' });
  const game = { id: games.length, name, code, author };
  games.push(game);
  res.json(game);
});

// Get all games
app.get('/api/games', (req, res) => {
  res.json(games);
});

// Get one game
app.get('/api/games/:id', (req, res) => {
  const game = games.find(g => g.id == req.params.id);
  if(!game) return res.status(404).json({ error: 'Game not found' });
  res.json(game);
});

// Post a comment to a game
app.post('/api/games/:id/comments', (req, res) => {
  const { author, text } = req.body;
  const gameId = Number(req.params.id);
  if(!author || !text) return res.status(400).json({ error: 'Missing fields' });
  const comment = { gameId, author, text };
  comments.push(comment);
  res.json(comment);
});

// Get comments for a game
app.get('/api/games/:id/comments', (req, res) => {
  const gameId = Number(req.params.id);
  res.json(comments.filter(c => c.gameId === gameId));
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
