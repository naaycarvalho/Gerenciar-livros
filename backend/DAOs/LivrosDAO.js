const db = require('../config/db.js');

class LivrosDAO {
    async inserir(livro) {
        const { Titulo, Autor, Editora, Ano, ISBN, NumeroDePaginas, Genero, Estado, Tombo, DataDeCadastro, Observacoes, Categoria } = livro;
        const query = `
            INSERT INTO livros (titulo, autor, editora, ano, isbn, numero_de_paginas, genero, estado, tombo, data_cadastro, observacoes, categoria) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [Titulo, Autor, Editora, Ano, ISBN, NumeroDePaginas, Genero, Estado, Tombo, DataDeCadastro, Observacoes, Categoria]);
        return result;
    }

    async deletar(id) {
        const query = 'DELETE FROM livros WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    }

    async buscarPorId(id) {
        const query = `
            SELECT id, titulo, autor, editora, ano, isbn, numero_de_paginas, genero, estado, tombo, data_cadastro, observacoes, categoria
            FROM livros
            WHERE id = ?
        `;
        const [rows] = await db.execute(query, [id]);
        return rows [0]; // Retorna o primeiro resultado encontrado
    }
    

    async buscarPorTermo(termo) {
        if (!termo || termo.trim() === '') {
            const query = 'SELECT * FROM livros ORDER BY titulo ASC';
            const [rows] = await db.execute(query);
            return rows;
        } else {
            const query = 'SELECT * FROM livros WHERE titulo LIKE ? OR autor LIKE ? OR editora LIKE ?';
            const [rows] = await db.execute(query, [`%${termo}%`, `%${termo}%`, `%${termo}%`]);
            return rows;
        }
    }

    async atualizar(id, livro) {
        const { Titulo, Autor, Editora, Ano, ISBN, NumeroDePaginas, Genero, Estado, Tombo, DataDeCadastro, Observacoes, Categoria } = livro;
        const query = `
            UPDATE livros
            SET titulo = ?, autor = ?, editora = ?, ano = ?, isbn = ?, numero_de_paginas = ?, genero = ?, estado = ?, tombo = ?, data_cadastro = ?, observacoes = ?, categoria = ?
            WHERE id = ?
        `;
        const [result] = await db.execute(query, [Titulo, Autor, Editora, Ano, ISBN, NumeroDePaginas, Genero, Estado, Tombo, DataDeCadastro, Observacoes, Categoria, id]);
        return result;
    }
}

module.exports = LivrosDAO;
