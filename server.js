const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/medicosDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Rotas
const medicosRoute = require('./routes/medicos');
app.use('/medicos', medicosRoute);

app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
});