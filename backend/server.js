const express = require('express');
const cors = require('cors');
const usuariosRoutes = require('./routes/UsuariosRoutes.js');
const fornecedoresRoutes = require('./routes/FornecedoresRoutes.js');
const livrosRoutes = require('./routes/LivrosRoutes.js');

const app = express();

app.use(cors())
app.use(express.json())

app.use('/usuario', usuariosRoutes);
app.use('/fornecedor', fornecedoresRoutes);
app.use('/livro', livrosRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});