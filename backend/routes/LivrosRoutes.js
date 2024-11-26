const express = require('express');
const livrosController = require('../controllers/LivrosController.js')
const router = express.Router();

router.post('/', livrosController.inserir);
router.put('/:id', livrosController.atualizar); // Atualização completa
router.patch('/:id', livrosController.atualizar); // Atualização parcial
router.get('/:id', livrosController.buscarPorId);    
router.get('/', livrosController.buscarPorFiltro);
router.delete('/:id', livrosController.deletar);

module.exports = router;