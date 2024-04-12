# Projeto MKS-Challenge
![GitHub language count](https://img.shields.io/github/languages/count/Henrique2305/simple-register)
![GitHub top language](https://img.shields.io/github/languages/top/Henrique2305/simple-register)

## Descrição
O projeto é uma API RESTful de filmes que utiliza o Redis como seu cache e o JWT para autenticação.

## ✔️ Tecnologias utilizadas

- ``TypeScript``
- ``NestJS``
- ``TypeORM``
- ``Swagger``
- ``Docker``
- ``Redis``
- ``PostgreSQL``

## Modo de uso
Para cadastrar um usuário:
POST: https://new-test-nestjs-deploy.onrender.com/usuario

E adicione o body, por exemplo:
{
    "username": "john",
    "password": "chang"
}

Faça uma requisição para:
POST: https://new-test-nestjs-deploy.onrender.com/auth/login

E pegue o token gerado.

Acesse esse path da documentação do Swagger para ver os endpoints do projeto:
https://new-test-nestjs-deploy.onrender.com/api
