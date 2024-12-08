const AutorDAO = require('../DAOs/AutorDAO.js');
class AutorModel {

    #id;
    #Nome;
    #Sobrenome;
    #Nacionalidade;
    #DataDeNascimento;
    #Biografia;


    constructor(id, Nome, Sobrenome, Nacionalidade, DataDeNascimento, Biografia) {
        this.#id = id;
        this.#Nome = Nome;
        this.#Sobrenome = Sobrenome;
        this.#Nacionalidade = Nacionalidade;
        this.#DataDeNascimento = DataDeNascimento;
        this.#Biografia = Biografia;
    }

    get id() {
        return this.#id;
    }

    get Nome() {
        return this.#Nome;
    }

    get Sobrenome() {
        return this.#Sobrenome;
    }

    get Nacionalidade() {   
        return this.#Nacionalidade;
    }
    get DataDeNascimento() {    
        return this.#DataDeNascimento;
    }  
   
    get Biografia() {    
        return this.#Biografia;
    }

    set id(value) {
        this.#id = value;
    }

    set Nome(value) {
        this.#Nome = value;
    }

    set Sobrenome(value) {
        this.#Sobrenome = value;
    }
    set Nacionalidade(value) {
        this.#Nacionalidade = value;
    }

    set DataDeNascimento(value) {
        this.#DataDeNascimento = value;
    }  

    set Biografia(value) {
        this.#Biografia = value;
    } 
    


    toJSON() {
        return {
            id: this.#id,
            Nome: this.#Nome,
            Sobrenome: this.#Sobrenome,
            Nacionalidade: this.#Nacionalidade,
            DataDeNascimento: this.#DataDeNascimento,
            Biografia: this.#Biografia
        };
    }

    static async criar(autorData) {
        const dao = new AutorDAO();
        const autor= new AutorModel(
            null,
            autorData.Nome, 
            autorData.Sobrenome, 
            autorData.Nacionalidade, 
            autorData.DataDeNascimento, 
            autorData.Biografia);

        const result = await dao.inserir(autor.toJSON());
        autor.#id = result.insertId;
        return autor;
    }

    static async buscarPorId(id) {
        const dao = new AutorDAO();
        const autor = await dao.buscarPorId(id);
        if (!autor) {
            return null;
        }    

        return new AutorModel(  
            autor.id,  
            autor.Nome,            
            autor.Sobrenome,
            autor.Nacionalidade,
            autor.DataDeNascimento,
            autor.Biografia
        );       
    }


    static async buscarPorFiltro(termo) {
        const dao = new AutorDAO();
        const rows = await dao.buscarPorTermo(termo);

        return rows.map(row => new AutorModel(
            row.id,
            row.Nome,
            row.Sobrenome,
            row.Nacionalidade,            
            row.DataDeNascimento,
            row.Biografia
        ));
    }

        async atualizar (autorData) {   
            const dao = new AutorDAO ();   
            const result = await dao.atualizar(this.#id, autorData);
            return result;
        }   
    
        async deletar () {
            const dao = new AutorDAO ();       
            const result = await dao.deletar(this.#id);
            return result;
        }
    
}

module.exports = AutorModel;