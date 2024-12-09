const db = require('../config/db.js');

class GeneroDAO {

    async inserir(genero) {
        const {descricao, tipoGenero} = genero;
        const query='INSERT INTO generos (descricao, tipo_genero) VALUES (?, ?)';
        const [result] = await db.execute(query, [descricao, tipoGenero]);
        return result;
    }

    async buscarPorTermo(termo) {
        if(!termo || termo.trim() === ''){
            const query = 'SELECT * FROM generos';
            const [rows] = await db.execute(query);
            return rows;
        }else{
            const query = 'SELECT * FROM generos WHERE descricao LIKE ? OR tipo_genero LIKE ?';
            const [rows] = await db.execute(query, [`%${termo}%`, `%${termo}%`]);
            return rows;
        }
    }

    async buscarPorId(id) {
        const query = 'SELECT * FROM generos WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0]; //Retorna o primeiro resultado
    }

    async deletar(id) {
        const query = 'DELETE FROM generos WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    }

    async atualizar(id, genero) {
        const { descricao, tipoGenero } = genero;
        const query = `UPDATE generos SET descricao = ?, tipo_genero = ? WHERE id = ?`;
        const [result] = await db.execute(query, [descricao, tipoGenero, id]);
        return result;
    }
}

module.exports = GeneroDAO;