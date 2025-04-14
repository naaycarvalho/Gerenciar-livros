const { Router } = require('express');

const autenticar = require('../seguranca/autenticar');

const rotaAutenticacao = new Router();


rotaAutenticacao.post('/login', autenticar.login);

module.exports = rotaAutenticacao;
