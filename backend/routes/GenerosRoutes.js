const express = require('express');
const generoController = require('../controllers/GeneroController.js')
const router = express.Router();

router.post('/', generoController.inserir);
router.put('/:id', generoController.atualizar);
router.get('/:id', generoController.buscarPorId);
router.get('/', generoController.buscarPorFiltro);
router.delete('/:id', generoController.deletar);

module.exports = router;