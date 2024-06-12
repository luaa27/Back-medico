const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:8080/medicos_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Rotas para CRUD de médicos, endereços e formações
app.use('/api/medicos', require('./routes/medicos'));

app.listen(PORT, () => {
  console.log({PORT});
});