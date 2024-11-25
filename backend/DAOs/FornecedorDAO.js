const db = require('../config/db.js');

class FornecedorDAO {

    async inserir(fornecedor) {
        const {razaoSocial, cnpj, representante, telefone, email, endereco, banco, agencia, conta} = fornecedor;
        const query='INSERT INTO fornecedores (razaoSocial, cnpj, representante, telefone, email, endereco, banco, agencia, conta) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const [result] = await db.execute(query, [razaoSocial, cnpj, representante, telefone, email, endereco, banco, agencia, conta]);
        return result;
    }

    async buscarPorTermo(termo) {
        if(!termo || termo.trim() === ''){
            const query = 'SELECT * FROM fornecedores';
            const [rows] = await db.execute(query);
            return rows;
        }else{
            const query = 'SELECT * FROM fornecedores WHERE razaoSocial LIKE ? OR cnpj LIKE ? OR email LIKE ?';
            const [rows] = await db.execute(query, [`%${termo}%`, `%${termo}%`, `%${termo}%`]);
            return rows;
        }
    }

    async buscarPorId(id) {
        const query = 'SELECT * FROM fornecedores WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    }

    async deletar(id) {
        const query = 'DELETE FROM fornecedores WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    }

    async atualizar(id, fornecedor) {
        const { razaoSocial, cnpj, representante, telefone, email, endereco, banco, agencia, conta } = usuario;
        const query = `
            UPDATE fornecedores
            SET razaoSocial = ?, cnpj = ?, representante = ?, telefone = ?, email = ?, endereco = ?, banco = ?, agencia = ?, conta = ?
            WHERE id = ?`;
        const [result] = await db.execute(query, [razaoSocial, cnpj, representante, telefone, email, endereco, banco, agencia, conta, id]);
        return result;
    }
}

module.exports = FornecedorDAO;