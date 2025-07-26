// server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importação das nossas rotas
const authRoutes = require('./src/routes/authRoutes');
const gddRoutes = require('./src/routes/gddRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/api', (req, res) => {
  res.status(200).json({ message: 'API do GDD.AI Assistant está no ar!' });
});

// Usando as rotas importadas com seus prefixos
app.use('/api/auth', authRoutes);
app.use('/api/gdds', gddRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
