CREATE SCHEMA `livros` ;

CREATE TABLE usuarios ( 
	id INT AUTO_INCREMENT PRIMARY KEY, 
	nome VARCHAR(255) NOT NULL, 
	cpf VARCHAR(14) NOT NULL UNIQUE, 
	data_nascimento DATE NOT NULL, 
	endereco VARCHAR(255) NOT NULL, 
	cep VARCHAR(10) NOT NULL, 
	telefone VARCHAR(15) NOT NULL, 
	email VARCHAR(255) NOT NULL, 
	tipo_usuario VARCHAR(100) NOT NULL
);

CREATE TABLE fornecedores (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    razaoSocial VARCHAR(200) NOT NULL, 
    cnpj VARCHAR(18) NOT NULL UNIQUE, 
    representante VARCHAR(200) NOT NULL, 
    telefone VARCHAR(15) NOT NULL, 
    email VARCHAR(150) NOT NULL, 
    endereco VARCHAR(255) NOT NULL, 
    banco VARCHAR(100) NOT NULL, 
    agencia VARCHAR(10) NOT NULL, 
    conta VARCHAR(20) NOT NULL
);

CREATE TABLE livros ( 
	id INT AUTO_INCREMENT PRIMARY KEY, 
	titulo VARCHAR(255) NOT NULL, 
	autor VARCHAR(255) NOT NULL, 
	editora VARCHAR(255) NOT NULL, 
	ano DATE NOT NULL,
	categoria VARCHAR(255) NOT NULL, 
	isbn VARCHAR(30) NOT NULL, 
	numero_de_paginas INT (4)NOT NULL, 
	genero VARCHAR(255) NOT NULL, 
	estado VARCHAR(255) NOT NULL,
	tombo INT(5) NOT NULL, 
	data_cadastro DATE NOT NULL, 
	observacoes VARCHAR(255) NOT NULL
);

CREATE TABLE generos ( 
	id INT AUTO_INCREMENT PRIMARY KEY, 
	descricao VARCHAR(255) NOT NULL, 
	tipo_genero VARCHAR(50) NOT NULL
	
); 

CREATE TABLE autores(
	id INT AUTO_INCREMENT PRIMARY KEY,
	Nome VARCHAR(255) NOT NULL,
	Sobrenome VARCHAR(255) NOT NULL,
	Nacionalidade VARCHAR(255) NOT NULL,
	DataDeNascimento DATE NOT NULL,
	Biografia VARCHAR(255) NOT NULL
);


CREATE TABLE motivosbaixa ( 
	id INT AUTO_INCREMENT PRIMARY KEY, 
	motivo VARCHAR(255) NOT NULL, 
	databaixa DATE NOT NULL
	
); 

CREATE TABLE categorias ( 
	id INT AUTO_INCREMENT PRIMARY KEY, 
	descricao VARCHAR(255) NOT NULL, 
	tipo_categoria VARCHAR(150) NOT NULL
); 

CREATE TABLE emprestimos (
    id_emprestimo INT AUTO_INCREMENT PRIMARY KEY,
    id_livro INT NOT NULL, 
    id_usuario INT NOT NULL, 
    data_emprestimo DATE NOT NULL, 
    data_devolucao DATE DEFAULT NULL,
    status_emprestimo VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_livro) REFERENCES livros(id) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);
