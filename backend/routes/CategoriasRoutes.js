const express = require('express');
const categoriaController = require('../controllers/CategoriaController.js')
const router = express.Router();

router.post('/', categoriaController.inserir);
router.put('/:id', categoriaController.atualizar);
router.get('/:id', categoriaController.buscarPorId);
router.get('/', categoriaController.buscarPorFiltro);
router.delete('/:id', categoriaController.deletar);

module.exports = router;