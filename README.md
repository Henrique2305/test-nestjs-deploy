# Projeto MKS-Challenge
![GitHub language count](https://img.shields.io/github/languages/count/Henrique2305/simple-register)
![GitHub top language](https://img.shields.io/github/languages/top/Henrique2305/simple-register)

## Descrição
O projeto é uma API RESTful de filmes que utiliza o Redis como seu cache e o JWT para autenticação.

## 🛠 Tecnologias

- ``TypeScript``    experiência: menos de um 1 ano
- ``NestJS``        experiência: menos de um 1 ano
- ``TypeORM``       experiência: menos de um 1 ano
- ``Swagger``       experiência: menos de um 1 ano
- ``Docker``        experiência: menos de um 1 ano
- ``Redis``         experiência: recente
- ``PostgreSQL``    experiência: menos de um 1 ano

## Modo de uso

Faça uma requisição para:
POST: https://new-test-nestjs-deploy.onrender.com/auth/login

E adicione no body o usuário:
{
    "username": "john",
    "password": "changeme"
}

Pegue o token gerado.

Utilize esse token nos outros endpoints.

Acesse esse path da documentação do Swagger para ver os endpoints do projeto:
https://new-test-nestjs-deploy.onrender.com/api
