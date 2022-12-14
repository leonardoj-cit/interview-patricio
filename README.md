Book Store - Interview

# VISÃO GERAL

Este projeto tem o intuito de conhecer um pouco sobre o nível tecnológico e boas práticas nas linguagens: Angular e Typescript.
Alguns itens diferenciais são conhecimentos em Angular Material, desenvolvimento de testes unitários com Jasmine para Serviços e Componentes e estilização utilizando SCSS.

## OBJETIVOS

- Desenvolver uma página listando os produtos disponíveis para a compra permitindo ao usuário definir a quantidade de itens desejados e adicionar ao carrinho de compras.
- Criar uma página de Checkout, que deverá listar os itens no carrinho de compras e permitir ao usuário visualizar e concluir a compra.

## API

- No projeto já está configurado um servidor para simular as iterações com API’s e subirá junto da aplicação através da URL: http://localhost:3000
- Para executar voce pode usar `npm run json-server`

## Installl and Execute

- Install: npm install | Execute: npm start

## ESPECIFICAÇÕES FUNCIONAIS

- Criar um Menu horizontal no topo da página com as opções:
  • Home
  • User
  • Guide: https://material.angular.io/components/menu/examples
  • Lembrar de importar o modulo MatMenuModule

### HOME

- Deve conter o Header e um mensagem de bem vindo centralizado na tela.

### USER

- Página listando itens disponíveis para compra:
- Deve conter uma tabela listando todos os itens, com um coluna editável para informar a quantidade de itens desejados e um botão Add ao lado.
- Ao clicar no botão Add, deve ser verificado se existe estoque suficiente para aquele livro e em caso de sucesso adicionar ao carrinho a quantidade de livros desejados e o contador ao lado do menu deve ser incrementado. Em caso de não ter itens no estoque deve exibir um Dialog com a mensagem de Erro: “Estoque insuficiente” e não adicionar ao carrinho.

#### Página de Checkout:

- Ela deverá ser acessada através do clique no contador ao lado do menu. Só estará disponível para acessar quando for maior que zero.
- Esta página deverá listar todos os itens no carrinho e um botão para finalizar o checkout.
- Ao finalizar o checkout deverá exibir um Dialog com mensagem de Sucesso e DELETAR os itens do estoque (DELETE http://localhost:3000/stock/:id) e inserir na lista de checkout finalizado (POST http://localhost:3000/checkout)
