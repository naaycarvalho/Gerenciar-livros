const db = require('../config/db.js');

class CategoriaDAO {

    async inserir(categoria) {
        const {descricao, tipoCategoria} = categoria;
        const query='INSERT INTO categorias (descricao, tipo_categoria) VALUES (?, ?)';
        const [result] = await db.execute(query, [descricao, tipoCategoria]);
        return result;
    }

    async buscarPorTermo(termo) {
        if(!termo || termo.trim() === ''){
            const query = 'SELECT * FROM categorias';
            const [rows] = await db.execute(query);
            return rows;
        }else{
            const query = 'SELECT * FROM categorias WHERE descricao LIKE ?';
            const [rows] = await db.execute(query, [`%${termo}%`]);
            return rows;
        }
    }

    async buscarPorId(id) {
        const query = 'SELECT * FROM categorias WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0]; //Retorna o primeiro resultado
    }

    async deletar(id) {
        const query = 'DELETE FROM categorias WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    }

    async atualizar(id, categoria) {
        const { descricao, tipoCategoria } = categoria;
        const query = `UPDATE categorias SET descricao = ?, tipo_categoria = ? WHERE id = ?`;
        const [result] = await db.execute(query, [descricao, tipoCategoria, id]);
        return result;
    }
}

module.exports = CategoriaDAO;