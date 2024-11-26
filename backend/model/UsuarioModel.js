const UsuarioDAO = require('../DAOs/UsuarioDAO.js');

class UsuarioModel {
    #id;
    #nome;
    #cpf;
    #dataNascimento;
    #endereco;
    #cep;
    #telefone;
    #email;
    #tipoUsuario;

    constructor(id, nome, cpf, dataNascimento, endereco, cep, telefone, email, tipoUsuario){
        this.#id = id;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#dataNascimento = dataNascimento;
        this.#endereco = endereco;
        this.#cep = cep;
        this.#telefone = telefone;
        this.#email = email;
        this.#tipoUsuario = tipoUsuario;
    }

    // Getters and Setters
    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get nome() {
        return this.#nome;
    }

    set nome(value) {
        this.#nome = value;
    }

    get cpf() {
        return this.#cpf;
    }

    set cpf(value) {
        this.#cpf = value;
    }

    get dataNascimento() {
        return this.#dataNascimento;
    }

    set dataNascimento(value) {
        this.#dataNascimento = value;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(value) {
        this.#endereco = value;
    }

    get cep() {
        return this.#cep;
    }

    set cep(value) {
        this.#cep = value;
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

    get tipoUsuario() {
        return this.#tipoUsuario;
    }

    set tipoUsuario(value) {
        this.#tipoUsuario = value;
    }

    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            cpf: this.#cpf,
            dataNascimento: this.#dataNascimento,
            endereco: this.#endereco,
            cep: this.#cep,
            telefone: this.#telefone,
            email: this.#email,
            tipoUsuario: this.#tipoUsuario
        };
    }

    static async criar(usuarioData){
        const dao = new UsuarioDAO();

        const usuario = new UsuarioModel(
            0,
            usuarioData.nome,
            usuarioData.cpf,
            usuarioData.dataNascimento,
            usuarioData.endereco,
            usuarioData.cep,
            usuarioData.telefone,
            usuarioData.email,
            usuarioData.tipoUsuario
        )

        const result = await dao.inserir(usuario.toJSON());
        
        usuario.#id = result.insertId;

        return usuario;
    }

    static async buscaPorFiltro(termo) {
        const dao = new UsuarioDAO();
        const rows = await dao.buscarPorTermo(termo);

        return rows.map(row => new UsuarioModel(
            row.id,
            row.nome,
            row.cpf,
            row.data_nascimento,
            row.endereco,
            row.cep,
            row.telefone,
            row.email,
            row.tipo_usuario
        ));
    }

    static async buscarPorId(id) {
        const dao = new UsuarioDAO();
        const data = await dao.buscarPorId(id);

        if(!data)
            return null;

        return new UsuarioModel(
            data.id,
            data.nome,
            data.cpf,
            data.data_nascimento,
            data.endereco,
            data.cep,
            data.telefone,
            data.email,
            data.tipo_usuario
        );
    }

    async deletar() {
        const dao = new UsuarioDAO();
        return await dao.deletar(this.#id);
    }

    async atualizar() {
        const dao = new UsuarioDAO();
        return await dao.atualizar(this.#id, this);
    }
}

module.exports = UsuarioModel;