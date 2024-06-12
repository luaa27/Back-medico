// routes/medicos.js
const express = require('express');
const router = express.Router();
const Medico = require('../models/Medico');
const Endereco = require('../models/endereco');
const Formacao = require('../models/formacao');

// Criar novo médico
router.post('/', async (req, res) => {
  const { nome, especialidade, endereco, formacao } = req.body;

  try {
    const newEndereco = new Endereco(endereco);
    const savedEndereco = await newEndereco.save();

    const newFormacao = new Formacao(formacao);
    const savedFormacao = await newFormacao.save();

    const newMedico = new Medico({ nome, especialidade, endereco: savedEndereco._id, formacao: savedFormacao._id });
    const savedMedico = await newMedico.save();

    res.status(201).json(savedMedico);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obter todos os médicos
router.get('/', async (req, res) => {
  try {
    const medicos = await Medico.find().populate('endereco').populate('formacao');
    res.json(medicos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obter médico por ID
router.get('/:id', async (req, res) => {
  try {
    const medico = await Medico.findById(req.params.id).populate('endereco').populate('formacao');
    if (!medico) return res.status(404).json({ message: 'Médico não encontrado' });
    res.json(medico);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Atualizar médico
router.put('/:id', async (req, res) => {
  const { nome, especialidade, endereco, formacao } = req.body;

  try {
    const medico = await Medico.findById(req.params.id);
    if (!medico) return res.status(404).json({ message: 'Médico não encontrado' });

    if (endereco) {
      await Endereco.findByIdAndUpdate(medico.endereco, endereco);
    }
    if (formacao) {
      await Formacao.findByIdAndUpdate(medico.formacao, formacao);
    }

    medico.nome = nome ?? medico.nome;
    medico.especialidade = especialidade ?? medico.especialidade;

    const updatedMedico = await medico.save();
    res.json(updatedMedico);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deletar médico
router.delete('/:id', async (req, res) => {
  try {
    const medico = await Medico.findById(req.params.id);
    if (!medico) return res.status(404).json({ message: 'Médico não encontrado' });

    await Endereco.findByIdAndDelete(medico.endereco);
    await Formacao.findByIdAndDelete(medico.formacao);
    await medico.remove();

    res.json({ message: 'Médico deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;