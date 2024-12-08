const express = require('express');
const autorController = require('../controllers/AutorController.js')
const router = express.Router();

router.post('/', autorController.inserir);
router.put('/:id', autorController.atualizar); // Atualização completa
router.patch('/:id', autorController.atualizar); // Atualização parcial
router.get('/:id', autorController.buscarPorId);    
router.get('/', autorController.buscarPorFiltro);
router.delete('/:id', autorController.deletar);

module.exports = router;