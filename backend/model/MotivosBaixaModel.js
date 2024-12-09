const MotivoBaixaDAO = require('../DAOs/MotivoBaixaDAO.js');

class MotivoBaixaModel {
    #id;
    #motivo;
    #data;

    constructor(id, motivo, data) {
        this.#id = id;
        this.#motivo = motivo;
        this.#data = data;
    }

    // Getters e Setters
    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get motivo() {
        return this.#motivo;
    }

    set motivo(value) {
        this.#motivo = value;
    }

    get data() {
        return this.#data;
    }

    set data(value) {
        this.#data = value;
    }

    toJSON() {
        return {
            id: this.#id,
            motivo: this.#motivo,
            data: this.#data
        };
    }

    // Métodos Estáticos
    static async criar(motivoBaixaData) {
        const dao = new MotivoBaixaDAO();

        // Validação de dados para garantir que não há undefined
        if (!motivoBaixaData.motivo || !motivoBaixaData.data) {
            throw new Error('Os campos motivo e data são obrigatórios.');
        }

        // Criação do objeto motivo de baixa
        const motivoBaixa = new MotivoBaixaModel(
            null, // id será gerado pelo banco
            motivoBaixaData.motivo,
            motivoBaixaData.data
        );

        // Inserir no banco de dados
        const result = await dao.inserir(motivoBaixaData);

        motivoBaixa.id = result.insertId;

        return motivoBaixa;
    }

    static async buscaPorFiltro(termo) {
        const dao = new MotivoBaixaDAO();
        const rows = await dao.buscarPorTermo(termo);

        return rows.map(row => new MotivoBaixaModel(
            row.id,
            row.motivo,
            row.data
        ));
    }

    static async buscarPorId(id) {
        const dao = new MotivoBaixaDAO();
        const data = await dao.buscarPorId(id);

        if (!data) return null;

        return new MotivoBaixaModel(
            data.id,
            data.motivo,
            data.data
        );
    }

    async deletar() {
        const dao = new MotivoBaixaDAO();
        return await dao.deletar(this.#id);
    }

    async atualizar(motivoBaixaData) {
        const dao = new MotivoBaixaDAO();

        // Atualiza os campos locais antes de enviar ao banco
        if (motivoBaixaData.motivo) this.#motivo = motivoBaixaData.motivo;
        if (motivoBaixaData.data) this.#data = motivoBaixaData.data;

        return await dao.atualizar(this.#id, this.toJSON());
    }
}

module.exports = MotivoBaixaModel;
