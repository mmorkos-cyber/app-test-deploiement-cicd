require('dotenv').config();
const express = require('express');
const cors = require('cors');
const users = require('./data/users.json');
const { getTrainingInfo } = require('./services/info.service');

const app = express();
const PORT = process.env.PORT;

// Volontairement permissif pour l'exercice.
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    candidate => candidate.username === username && candidate.password === password
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Identifiants incorrects'
    });
  }
  const token = process.env.TOKEN
  const { password: _password, ...safeUser } = user;
  // Faux token volontairement prédictible et aucune protection des données retournées.
  return res.json({
    success: true,
    token: `${token}-${user.id}`,
    safeUser
  });
});

app.get('/api/info', (req, res) => {
  const info = getTrainingInfo();

  res.json({
    ...info,
    servedAt: new Date().toISOString()
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend démarré sur le port :${PORT}`);
});
