const express = require('express');
const EmprestimoController = require('../controllers/EmprestimoController.js')  
const router = express.Router();

router.post('/', EmprestimoController.gravar);
router.get('/', EmprestimoController.buscarEmprestimos);
router.get('/:idEmprestimo', EmprestimoController.buscarEmprestimosPorId);
router.put('/:idEmprestimo', EmprestimoController.atualizar);
router.patch('/:idEmprestimo', EmprestimoController.atualizar);
router.delete('/:idEmprestimo', EmprestimoController.deletar);

module.exports = router;