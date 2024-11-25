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



CREATE SCHEMA `fornecedores`;

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
