const  LivrosDAO = require('../DAOs/LivrosDAO.js')
class LivrosModel {

    #id;
    #Titulo;
    #Autor;
    #Editora;
    #Ano;
    #Categoria;
    #ISBN;
    #NumeroDePaginas;
    #Genero;
    #Estado;
    #Tombo;
    #DataDeCadastro;
    #Observacoes;
   
  

    constructor(id, Titulo, Autor, Editora, Ano, Categorium, ISBN, NumeroDePaginas, Genero, Estado, Tombo, DataDeCadastro, Observacoes) {
        this.#id = id;
        this.#Titulo = Titulo;
        this.#Autor = Autor;
        this.#Editora = Editora;
        this.#Ano = Ano;
        this.#Categoria = Categorium;
        this.#ISBN = ISBN;
        this.#NumeroDePaginas = NumeroDePaginas;
        this.#Genero = Genero;
        this.#Estado = Estado;
        this.#Tombo = Tombo;
        this.#DataDeCadastro = DataDeCadastro;
        this.#Observacoes = Observacoes;
    }

    get id() {
        return this.#id;        
    }   

    get Titulo() {
        return this.#Titulo;        
    }

    get Autor() {
        return this.#Autor;        
    }

    get Editora() {
        return this.#Editora;
    }

    get Ano() {
        return this.#Ano;
    }

    get Categoria() {
        return this.#Categoria;        
    }

    get ISBN() {
        return this.#ISBN;
    }

    get NumeroDePaginas() {
        return this.#NumeroDePaginas;
    }

    get Genero() {        
        return this.#Genero;
    }   

    get Estado() {        
        return this.#Estado;
    }   

    get Tombo() {        
        return this.#Tombo;
    }   

    get DataDeCadastro() {        
        return this.#DataDeCadastro;
    }   

    get Observacoes() {        
        return this.#Observacoes;
    }   

    set id(value) {
        this.#id = value;
    }   

    set Titulo(value) {
        this.#Titulo = value;
    }

    set Autor(value) {
        this.#Autor = value;    
    }

    set Editora(value) {        
        this.#Editora = value;
    }           

    set Ano(value) {            
        this.#Ano = value;
    }

    set Categoria(value) {
        this.#Categoria = value;
    }

    set ISBN(value) {
        this.#ISBN = value;
    }

    set NumeroDePaginas(value) {
        this.#NumeroDePaginas = value;
    }

    set Genero(value) {
        this.#Genero = value;
    }

    set Estado(value) {
        this.#Estado = value;
    }

    set Tombo(value) {
        this.#Tombo = value;
    }

    set DataDeCadastro(value) {
        this.#DataDeCadastro = value;
    }

    set Observacoes(value) {
        this.#Observacoes = value;
    }   

    toJSON() {
        return {
            id: this.#id,
            Titulo: this.#Titulo,
            Autor: this.#Autor,
            Editora: this.#Editora,
            Ano: this.#Ano,
            Categoria: this.#Categoria,
            ISBN: this.#ISBN,
            NumeroDePaginas: this.#NumeroDePaginas,
            Genero: this.#Genero,
            Estado: this.#Estado,
            Tombo: this.#Tombo,
            DataDeCadastro: this.#DataDeCadastro,
            Observacoes: this.#Observacoes
        };
    }
    


    static async criar(livroData) {
        const dao = new LivrosDAO();
        const livro = new LivrosModel(
            null,
            livroData.Titulo,
            livroData.Autor,
            livroData.Editora,
            livroData.Ano,
            livroData.Categoria,
            livroData.ISBN,
            livroData.NumeroDePaginas,
            livroData.Genero,
            livroData.Estado,
            livroData.Tombo,
            livroData.DataDeCadastro,
            livroData.Observacoes
        );
        const result = await dao.inserir(livro.toJSON());
        livro.#id = result.insertId;
        return livro;
    }

    static async buscarPorId(id) {
        const dao = new LivrosDAO();   
        const livro = await dao.buscarPorId(id);    
    
        // Verificar se o livro foi encontrado antes de criar o modelo
        if (!livro) {
            return null; // Retorna null se o livro não for encontrado
        }
    
        return new LivrosModel(
            livro.id,             // Passa o ID correto do banco de dados
            livro.Titulo,        
            livro.Autor,
            livro.Editora,
            livro.Ano,
            livro.Categoria,
            livro.ISBN,
            livro.NumeroDePaginas,
            livro.Genero,
            livro.Estado,
            livro.Tombo,
            livro.DataDeCadastro,
            livro.Observacoes
        );     
    }
    

  static async buscarPorFiltro(termo) {
    const dao = new LivrosDAO();   
    const rows = await dao.buscarPorTermo(termo);    

    return rows.map(row => new LivrosModel(
        row.id,
        row.titulo,         
        row.autor,
        row.editora,
        row.ano,
        row.categoria,
        row.isbn,
        row.numero_de_paginas,
        row.genero,
        row.estado,
        row.tombo,
        row.data_cadastro,
        row.observacoes
    ));
}



    async atualizar (livroData) {   
        const dao = new LivrosDAO ();   
        const result = await dao.atualizar(this.#id, livroData);
        return result;
    }   

    async deletar () {
        const dao = new LivrosDAO ();       
        const result = await dao.deletar(this.#id);
        return result;
    }


    

 

}

module.exports = LivrosModel;
