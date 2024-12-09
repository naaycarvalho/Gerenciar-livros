const express = require('express');
const router = express.Router();
const MotivoBaixaController = require('../controllers/MotivoBaixaController');


router.post('/motivos-baixa', MotivoBaixaController.inserir);
router.get('/motivos-baixa', MotivoBaixaController.buscarPorFiltro);
router.get('/motivos-baixa/:id', MotivoBaixaController.buscarPorId);
router.delete('/motivos-baixa/:id', MotivoBaixaController.deletar);
router.put('/motivos-baixa/:id', MotivoBaixaController.atualizar);

module.exports = router;
