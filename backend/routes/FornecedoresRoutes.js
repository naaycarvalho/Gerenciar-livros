const express = require('express');
const router = express.Router();
const FornecedorController = require('../controllers/FornecedorController');

// Rota de inserção de fornecedor
router.post('/fornecedores', FornecedorController.inserir);
router.get('/fornecedores', FornecedorController.buscarPorFiltro);
router.get('/fornecedores/:id', FornecedorController.buscarPorId);
router.delete('/fornecedores/:id', FornecedorController.deletar);
router.put('/fornecedores/:id', FornecedorController.atualizar);

module.exports = router;

