const GeneroDAO = require('../DAOs/GeneroDAO.js');

class GeneroModel{
    #id;
    #descricao;
    #tipoGenero;

    constructor(id, descricao, tipoGenero){
        this.#id = id;
        this.#descricao = descricao;
        this.#tipoGenero = tipoGenero;
    }

    // Getters and Setters
    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(value) {
        this.#descricao = value;
    }

    get tipoGenero() {
        return this.#tipoGenero;
    }

    set tipoGenero(value) {
        this.#tipoGenero = value;
    }

    toJSON() {
        return {
            id: this.#id,
            descricao: this.#descricao,
            tipoGenero: this.#tipoGenero
        };
    }

    static async criar(generoData){
        const dao = new GeneroDAO();

        const genero = new GeneroModel(0, generoData.descricao, generoData.tipoGenero)

        const result = await dao.inserir(genero.toJSON());
        
        genero.#id = result.insertId;

        return genero;
    }

    static async buscaPorFiltro(termo) {
        const dao = new GeneroDAO();
        const rows = await dao.buscarPorTermo(termo);

        return rows.map(row => new GeneroModel(
            row.id,
            row.descricao,
            row.tipo_genero
        ));
    }

    static async buscarPorId(id) {
        const dao = new GeneroDAO();
        const data = await dao.buscarPorId(id);

        if(!data)
            return null;

        return new GeneroModel(
            data.id,
            data.descricao,
            data.tipo_genero
        );
    }

    async deletar() {
        const dao = new GeneroDAO();
        return await dao.deletar(this.#id);
    }

    async atualizar() {
        const dao = new GeneroDAO();
        return await dao.atualizar(this.#id, this);
    }
}

module.exports = GeneroModel;