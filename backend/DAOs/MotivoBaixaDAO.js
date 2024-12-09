const db = require('../config/db.js');

class MotivoBaixaDAO {
    async inserir(motivoBaixa) {
        const { motivo, data } = motivoBaixa;
        console.log('Dados recebidos para inserção:', { motivo, data });

        const query = `
            INSERT INTO motivos_baixa (motivo, data)
            VALUES (?, ?)`;

        const [result] = await db.execute(query, [motivo, data]);
        return result;
    }

    async buscarPorTermo(termo) {
        if (!termo || termo.trim() === '') {
            const query = 'SELECT * FROM motivos_baixa';
            const [rows] = await db.execute(query);
            return rows;
        } else {
            const query = `
                SELECT * FROM motivos_baixa
                WHERE motivo LIKE ?`;
            const [rows] = await db.execute(query, [`%${termo}%`]);
            return rows;
        }
    }

    async buscarPorId(id) {
        const query = 'SELECT * FROM motivos_baixa WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    }

    async deletar(id) {
        const query = 'DELETE FROM motivos_baixa WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    }

    async atualizar(id, motivoBaixa) {
        const { motivo, data } = motivoBaixa;
        const query = `
            UPDATE motivos_baixa
            SET motivo = ?, data = ?
            WHERE id = ?`;

        const [result] = await db.execute(query, [motivo, data, id]);
        return result;
    }
}

module.exports = MotivoBaixaDAO;
