const FornecedorDAO = require('../DAOs/FornecedorDAO.js');

class FornecedorModel {
    #id;
    #razaoSocial;
    #cnpj;
    #representante;
    #telefone;
    #email;
    #endereco;
    #banco;
    #agencia;
    #conta

    constructor(id, razaoSocial, cnpj, representante, telefone, email, endereco, banco, agencia, conta){
        this.#id = id;
        this.#razaoSocial = razaoSocial;
        this.#cnpj = cnpj;
        this.#representante = representante;
        this.#telefone = telefone;
        this.#email = email;
        this.#endereco = endereco;
        this.#banco = banco;
        this.#agencia = agencia;
        this.#conta = conta;
    }

    // Getters and Setters
    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get razaoSocial() {
        return this.#razaoSocial;
    }

    set razaoSocial(value) {
        this.#razaoSocial = value;
    }

    get cnpj() {
        return this.#cnpj;
    }

    set cnpj(value) {
        this.#cnpj = value;
    }

    get representante() {
        return this.#representante;
    }

    set representante(value) {
        this.#representante = value;
    }

    get telefone() {
        return this.#telefone;
    }

    set telefone(value) {
        this.#telefone = value;
    }

    get email() {
        return this.#email;
    }

    set email(value) {
        this.#email = value;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(value) {
        this.#endereco = value;
    }

    get banco() {
        return this.#banco;
    }

    set banco(value) {
        this.#banco = value;
    }

    get agencia() {
        return this.#agencia;
    }

    set agencia(value) {
        this.#agencia = value;
    }

    get conta() {
        return this.#conta;
    }

    set conta(value) {
        this.#conta = value;
    }

    toJSON() {
        return {
            id: this.#id,
            nome: this.#razaoSocial,
            cnpj: this.#cnpj,
            representante: this.#representante,
            telefone: this.#telefone,
            email: this.#email,
            endereco: this.#endereco,
            banco: this.#banco,
            agencia: this.#agencia,
            conta: this.#conta
        };
    }

    static async criar(fornecedorData){
        const dao = new FornecedorDAO();

        const fornecedor = new FornecedorModel(
            null,
            fornecedorData.razaoSocial,
            fornecedorData.cnpj,
            fornecedorData.representante,
            fornecedorData.telefone,
            fornecedorData.email,
            fornecedorData.endereco,
            fornecedorData.banco,
            fornecedorData.agencia,
            fornecedorData.conta
        )

        const result = await dao.inserir(fornecedor.toJSON());
        
        fornecedor.#id = result.insertId;

        return fornecedor;
    }

    static async buscaPorFiltro(termo) {
        const dao = new FornecedorDAO();
        const rows = await dao.buscarPorTermo(termo);

        return rows.map(row => new FornecedorModel(
            row.id,
            row.razaoSocial,
            row.cnpj,
            row.representante,
            row.telefone,
            row.email,
            row.endereco,
            row.banco,
            row.agencia,
            row.conta
        ));
    }

    static async buscarPorId(id) {
        const dao = new FornecedorDAO();
        const data = await dao.buscarPorId(id);

        if(!data)
            return null;

        return new FornecedorModel(
            data.id,
            data.razaoSocial,
            data.cnpj,
            data.representante,
            data.telefone,
            data.email,
            data.endereco,
            data.banco,
            data.agencia,
            data.conta
        );
    }

    async deletar() {
        const dao = new FornecedorDAO();
        return await dao.deletar(this.#id);
    }

    async atualizar(id, fornecedorData) {
        const dao = new FornecedorDAO();
        return await dao.atualizar(this.#id, this);
    }
}

module.exports = FornecedorModel;