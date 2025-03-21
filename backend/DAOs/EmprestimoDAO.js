const db = require('../config/db.js');

class EmprestimoDAO {

    async gravar(emprestimo) {
        const { idLivro, idUsuario, dataRetirada, dataDevolucao, status } = emprestimo;
        const query = 'INSERT INTO emprestimos (id_livro, id_usuario, data_emprestimo, data_devolucao, status_emprestimo) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.execute(query, [idLivro, idUsuario, dataRetirada, dataDevolucao, status]);
        return { insertId: result.insertId }; 
    }

    async atualizarEmprestimo(idEmprestimo, emprestimo) {
        console.log("ID recebido para atualizar:", idEmprestimo);
        console.log("Dados recebidos para atualizar:", emprestimo);
    
        const { idLivro, idUsuario, dataRetirada, dataDevolucao, status } = emprestimo;
    
        const query = `
            UPDATE emprestimos 
            SET id_livro = ?, id_usuario = ?, data_emprestimo = ?, data_devolucao = ?, status_emprestimo = ? 
            WHERE id_emprestimo = ?`;
    
        const [result] = await db.execute(query, [
            idLivro,
            idUsuario,
            dataRetirada,
            dataDevolucao,
            status,
            idEmprestimo
        ]);
    
        console.log("Resultado da atualização:", result);
    
        return result;
    }
    

    async deletarEmprestimo(idEmprestimo) {
        if (!idEmprestimo) {
            throw new Error("ID do empréstimo é obrigatório para deletar.");
        }
        
        const query = 'DELETE FROM emprestimos WHERE id_emprestimo = ?';
        const [result] = await db.execute(query, [idEmprestimo]);
    
        return result.affectedRows > 0; 
    }
    
    
    async buscarEmprestimos() {
       
        const sql = `SELECT 
    Emprestimos.id_emprestimo AS idEmprestimo, 
    Livros.id AS livroId, 
    Livros.titulo AS tituloLivro, 
    Usuarios.id AS usuarioId, 
    Usuarios.nome AS nomeUsuario, 
    Emprestimos.data_emprestimo AS dataEmprestimo,
    Emprestimos.data_devolucao AS dataDevolucao,
    Emprestimos.status_emprestimo AS statusEmprestimo
    FROM Emprestimos
    INNER JOIN Livros ON Emprestimos.id_livro = Livros.id
    INNER JOIN Usuarios ON Emprestimos.id_usuario = Usuarios.id;

        `;
            
            const conexao = await db.getConnection();
            const [rows] = await db.execute(sql);
            conexao.release();
        
            if (rows.length > 0) {
                const emprestimos = rows.map(row => ({
                    idEmprestimo: row.idEmprestimo,
                   
                    livro: {
                        id: row.livroId,
                        titulo: row.tituloLivro
                    },
                    usuario: {
                        id: row.usuarioId,
                        nome: row.nomeUsuario,
                        sobrenome: row.sobrenomeUsuario
                    },
                    dataEmprestimo: row.dataEmprestimo,
                    dataDevolucao: row.dataDevolucao,
                    statusEmprestimo: row.statusEmprestimo,
                }));
                return emprestimos;
            }
        
       
    }

    async buscarEmprestimoPorId(idEmprestimo) {
        const query = 'SELECT * FROM emprestimos WHERE id_emprestimo = ?';
        const [result] = await db.execute(query, [idEmprestimo]);
        return result.length > 0 ? result[0] : null; 
    }
}

module.exports =  EmprestimoDAO;
