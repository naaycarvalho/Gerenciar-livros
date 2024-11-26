const express = require('express');
const fornecedorController = require('../controllers/FornecedorController.js')
const router = express.Router();

router.post('/', fornecedorController.inserir);
router.put('/:id', fornecedorController.atualizar);
router.get('/:id', fornecedorController.buscarPorId);
router.get('/', fornecedorController.buscarPorFiltro);
router.delete('/:id', fornecedorController.deletar);

module.exports = router;