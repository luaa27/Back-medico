// models/Formacao.js
const mongoose = require('mongoose');

const formacaoSchema = new mongoose.Schema({
  instituicao: { type: String, required: true },
  ano_conclusao: { type: Number, required: true },
  grau: { type: String, required: true }
});

module.exports = mongoose.model('Formacao', formacaoSchema);