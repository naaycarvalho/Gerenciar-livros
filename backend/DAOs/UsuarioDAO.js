const db = require('../config/db.js');

class UsuarioDAO {

    async inserir(usuario) {
        const {nome, cpf, dataNascimento, endereco, cep, telefone, email, tipoUsuario} = usuario;
        const query='INSERT INTO usuarios (nome, cpf, data_nascimento, endereco, cep, telefone, email, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const [result] = await db.execute(query, [nome, cpf, dataNascimento, endereco, cep, telefone, email, tipoUsuario]);
        return result;
    }

    async buscarPorTermo(termo) {
        if(!termo || termo.trim() === ''){
            const query = 'SELECT * FROM usuarios';
            const [rows] = await db.execute(query);
            return rows;
        }else{
            const query = 'SELECT * FROM usuarios WHERE nome LIKE ? OR cpf LIKE ? OR email LIKE ?';
            const [rows] = await db.execute(query, [`%${termo}%`, `%${termo}%`, `%${termo}%`]);
            return rows;
        }
    }

    async buscarPorId(id) {
        const query = 'SELECT * FROM usuarios WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0]; //Retorna o primeiro resultado
    }

    async deletar(id) {
        const query = 'DELETE FROM usuarios WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    }

    async atualizar(id, usuario) {
        const { nome, cpf, dataNascimento, endereco, cep, telefone, email, tipoUsuario } = usuario;
        const query = `
            UPDATE usuarios
            SET nome = ?, cpf = ?, data_nascimento = ?, endereco = ?, cep = ?, telefone = ?, email = ?, tipo_usuario = ?
            WHERE id = ?`;
        const [result] = await db.execute(query, [nome, cpf, dataNascimento, endereco, cep, telefone, email, tipoUsuario, id]);
        return result;
    }
}

module.exports = UsuarioDAO;