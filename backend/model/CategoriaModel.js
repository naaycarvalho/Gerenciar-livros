const CategoriaDAO = require('../DAOs/CategoriaDAO.js');

class CategoriaModel{
    #id;
    #descricao;
    #tipoCategoria;

    constructor(id, descricao, tipoCategoria){
        this.#id = id;
        this.#descricao = descricao;
        this.#tipoCategoria = tipoCategoria;
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

    get tipoCategoria() {
        return this.#tipoCategoria;
    }

    set tipoCategoria(value) {
        this.#tipoCategoria = value;
    }

    toJSON() {
        return {
            id: this.#id,
            descricao: this.#descricao,
            tipoCategoria: this.#tipoCategoria
        };
    }

    static async criar(categoriaData){
        const dao = new CategoriaDAO();

        const categoria = new CategoriaModel(0, categoriaData.descricao, categoriaData.tipoCategoria)

        const result = await dao.inserir(categoria.toJSON());
        
        categoria.#id = result.insertId;

        return categoria;
    }

    static async buscaPorFiltro(termo) {
        const dao = new CategoriaDAO();
        const rows = await dao.buscarPorTermo(termo);

        return rows.map(row => new CategoriaModel(
            row.id,
            row.descricao,
            row.tipo_categoria
        ));
    }

    static async buscarPorId(id) {
        const dao = new CategoriaDAO();
        const data = await dao.buscarPorId(id);

        if(!data)
            return null;

        return new CategoriaModel(
            data.id,
            data.descricao,
            data.tipo_categoria
        );
    }

    async deletar() {
        const dao = new CategoriaDAO();
        return await dao.deletar(this.#id);
    }

    async atualizar() {
        const dao = new CategoriaDAO();
        return await dao.atualizar(this.#id, this);
    }
}

module.exports = CategoriaModel;