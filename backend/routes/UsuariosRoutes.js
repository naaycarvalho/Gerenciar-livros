const express = require('express');
const usuarioController = require('../controllers/UsuarioController.js')
const router = express.Router();

router.post('/', usuarioController.inserir);
router.put('/:id', usuarioController.atualizar);
router.get('/:id', usuarioController.buscarPorId);
router.get('/', usuarioController.buscarPorFiltro);
router.delete('/:id', usuarioController.deletar);

module.exports = router;