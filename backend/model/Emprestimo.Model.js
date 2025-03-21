const EmprestimoDAO = require('../DAOs/EmprestimoDAO.js');
const Livro = require('../model/LivrosModel.js');
const Usuario = require('../model/UsuarioModel.js');

class Emprestimo {
    #idEmprestimo;
    #idLivro;
    #idUsuario;
    #dataRetirada;
    #dataDevolucao;
    #status;

    constructor(idEmprestimo, idLivro, idUsuario, dataRetirada, dataDevolucao, status) {
        this.#idEmprestimo = idEmprestimo;
        this.#idLivro = idLivro;
        this.#idUsuario = idUsuario;
        this.#dataRetirada = dataRetirada;
        this.#dataDevolucao = dataDevolucao;
        this.#status = status;
    }

    get idEmprestimo() {
        return this.#idEmprestimo;
    }

    get idLivro() {
        return this.#idLivro;
    }

    get idUsuario() {
        return this.#idUsuario;
    }

    get dataRetirada() {
        return this.#dataRetirada;
    }

    get dataDevolucao() {
        return this.#dataDevolucao;
    }

    get status() {
        return this.#status;
    }

    set idEmprestimo(novoIdEmprestimo) {
        this.#idEmprestimo = novoIdEmprestimo;
    }

    set idLivro(novoIdLivro) {
        this.#idLivro = novoIdLivro;
    }

    set idUsuario(novoIdUsuario) {
        this.#idUsuario = novoIdUsuario;
    }

    set dataRetirada(novaDataRetirada) {
        this.#dataRetirada = novaDataRetirada;
    }

    set dataDevolucao(novaDataDevolucao) {
        this.#dataDevolucao = novaDataDevolucao;
    }

    set status(novoStatus) {
        this.#status = novoStatus;
    }

    toJSON() {
        return {
            idEmprestimo: this.#idEmprestimo,
            idLivro: this.#idLivro,   
            idUsuario: this.#idUsuario,
            dataRetirada: this.#dataRetirada,
            dataDevolucao: this.#dataDevolucao,
            status: this.#status
        };
    }

    static async gravar(emprestimoData) {
        console.log("Dados recebidos para gravação:", emprestimoData); 
    
        const dao = new EmprestimoDAO();
    
        const emprestimo = new Emprestimo(
            0,
            emprestimoData.idLivro,
            emprestimoData.idUsuario,
            emprestimoData.dataEmprestimo,
            emprestimoData.dataDevolucao,
            emprestimoData.status
        );
    
        const result = await dao.gravar(emprestimo.toJSON());
        emprestimo.#idEmprestimo = result.insertId;
        return emprestimo;
    }
    

    static async buscarTodos() {
        const dao = new EmprestimoDAO();
        return await dao.buscarEmprestimos();
    }

    static async buscarPorId(idEmprestimo) {    
        if (!idEmprestimo || isNaN(idEmprestimo)) {
            return null;
        }
    
        const dao = new EmprestimoDAO();
        const emprestimoData = await dao.buscarEmprestimoPorId(idEmprestimo);
    
        if (!emprestimoData) {
            return null;
        }
    
        return new Emprestimo(
            emprestimoData.id_emprestimo,
            emprestimoData.id_livro,
            emprestimoData.id_usuario,
            emprestimoData.data_emprestimo,
            emprestimoData.data_devolucao,
            emprestimoData.status_emprestimo
        );
    }
        async atualizar() {
        const dao = new EmprestimoDAO();
        return await dao.atualizarEmprestimo(this.#idEmprestimo, this);
    }
    
    

    async deletar() {
        const dao = new EmprestimoDAO();
        return await dao.deletarEmprestimo(this.#idEmprestimo);
    }

}    


module.exports = Emprestimo;
