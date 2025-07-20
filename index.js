require('dotenv').config();

const express = require('express');
const path = require('path');
const authRoutes = require('./routes/authRoutes');

const knex = require('knex')({
  client: 'sqlite3',
  connection: { filename: process.env.DATABASE_URL },
  useNullAsDefault: true
});

const app = express();

// 1) JSON parser
app.use(express.json());

// 2) monta as rotas de autenticação
app.use('/api/auth', authRoutes);

// 3) serve o front‑end estático (se quiser)
app.use(express.static(path.join(__dirname, 'public')));

// rota de teste simples
app.get('/', (req, res) => {
  res.send('API rodando com sucesso');
});

// 4) inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
