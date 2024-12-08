const db = require('../config/db.js');

class AutorDAO {

    async inserir(autor) {   
        const { Nome, Sobrenome, Nacionalidade, DataDeNascimento, Biografia } = autor; 
        const query = `
            INSERT INTO Autores (Nome, Sobrenome, Nacionalidade, DataDeNascimento, Biografia) 
            VALUES (?, ?, ?, ?, ?)`;
        const [result] = await db.execute(query, [Nome, Sobrenome, Nacionalidade, DataDeNascimento, Biografia]);

        // Retorna o autor inserido (com seu id) após a inserção
        return { ...autor, id: result.insertId };
    }

    async atualizar(id, autor) {  
        const { Nome, Sobrenome, Nacionalidade, DataDeNascimento, Biografia } = autor;
        const query = `
            UPDATE Autores    
            SET Nome = ?, Sobrenome = ?, Nacionalidade = ?, DataDeNascimento = ?, Biografia = ? 
            WHERE id = ?`;
        const [result] = await db.execute(query, [Nome, Sobrenome, Nacionalidade, DataDeNascimento, Biografia, id]);
        return result;
    }

    async buscarPorTermo(termo) { 
        if(!termo || termo.trim() === ''){
            const query = 'SELECT * FROM Autores ORDER BY Nome ASC'; // Ordem alfabética por nome
            const [rows] = await db.execute(query);
            return rows;
        } else {
            const query = 'SELECT * FROM Autores WHERE Nome LIKE ? OR Sobrenome LIKE ? OR Nacionalidade LIKE ? ORDER BY Nome ASC';
            const [rows] = await db.execute(query, [`%${termo}%`, `%${termo}%`, `%${termo}%`]);
            return rows;
        }
    }

    async buscarPorId(id) { 
        const query = `
            SELECT id, Nome, Sobrenome, Nacionalidade, DataDeNascimento, Biografia
            FROM Autores
            WHERE id = ?`;
        const [result] = await db.execute(query, [id]);
        return result[0];
    }   

    async deletar(id) { 
        const query = `DELETE FROM Autores WHERE id = ?`;
        const [result] = await db.execute(query, [id]);
        return result;
    }
}

module.exports = AutorDAO;
