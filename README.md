Book Store - Interview

# VISÃO GERAL

Este projeto tem o intuito de conhecer um pouco sobre o nível tecnológico e boas práticas nas linguagens: Angular e Typescript.
Alguns itens diferenciais são conhecimentos em Angular Material, desenvolvimento de testes unitários com Jasmine para Serviços e Componentes e estilização utilizando SCSS.
Crie uma nova branch apartir da MASTER e ao final do desenvolvimento crie um Pull Request para a MASTER. Caso queira adicionar algum comentario ou consideração referente ao seu desenvolvimento fique a vontade.
O prazo para entrega deste desafio será: 23/12/22.

## OBJETIVOS

- Requisito principal: Loja de Livros Online.
- Desenvolver uma página listando os produtos disponíveis para a compra permitindo ao usuário definir a quantidade de itens desejados e adicionar a um carrinho de compras.
- Desenvolver uma página de Checkout, que deverá listar os itens no carrinho de compras e permitir ao usuário visualizar e concluir a compra.
- Voce é livre para criar o seu proprio layout, use sua critividade e conhecimento
- A estrutura do projeto pode ser ajustado como quiser. A quebra de modulos, componentes, servicos e camadas faz parte da avaliacao.
- Quebra de metodos e resposabilidades tambem serao avaliados.
- Se voce tiver conhecimento em unit tests (jasmine) ou component tests (cypress), será um diferencial.

## API

- No projeto já está configurado um servidor para simular as iterações com API’s e subirá junto da aplicação através da URL: http://localhost:3000
- Para executar voce pode usar `npm run json-server`

## Installl and Execute

- Install: npm install | Execute: npm start

## ESPECIFICAÇÕES TÉCNICAS

- Node: >= 13.1.0 <= 14.17  
- NPM: >= 7.x.x <=  8.xx  
- Angular 8 (it's not necessary to upgrade to the new angular version)  
- Install: npm install   
- Start Applicaton and run the server in parallel: npm start  
- Run tests: npm test  
- Run only the server: npm run json-server  
- Recomendado adicionar Angular Material caso tenha connhecimento, mas também é permitido Bootstrap.  
- Evitar instalar third party libraries, queremos ver vc em ação. 

## ESPECIFICAÇÕES FUNCIONAIS

- Criar um Menu horizontal no topo da página (https://material.angular.io/components/menu/examples) com as opções:

  - Alinhado à esquerda:  
    - Home  
    - Sale  
  - Alinhado à direita:  
    - Icone de carrinho de compras com um contador
    
### HOME

- Ao clicar no menu Home, o usuario deverá ser redirecionado para uma pagina contendo o menu default e no centro da Tela uma mensagem de bem vindo.

### SALE

- Ao clicar no menu Sale, o usuário deverá ser redirecionado para uma pagina contendo o menu default e a listagem de itens disponiveis para compra.
- A listagem de produtos deve ser realizada em uma tabela com paginação de 10 itens por pagina.
- As informações disponiveis para o usuario serão: Book name, Author, Genre, Language.
- O usuário poderá adicionar itens em seu carrinho através da propria tabela, que deverá conter uma coluna para informar a quantidade (validações de campo numerico e valores acima de zero devem ser consideradas) e outra coluna com um botão ou icone 'ADD'.
- Ao clicar no botão Add, deve ser verificado se existe estoque suficiente para aquele livro e em caso de sucesso adicionar ao carrinho a quantidade de livros desejados e o contador ao lado do menu deve ser incrementado. Em caso de não ter itens no estoque deve exibir um Dialog com a mensagem de Erro: “Estoque insuficiente” e não adicionar ao carrinho.
- No carregamento dos produtos, caso identificado que nao existam itens no estoque, o campo de quantidade deve ser desabilitado e o botão Add' deve ser substituido pela mensagem 'Indisponivel'.

### CHECKOUT:

- Ao clicar no icone do carrinho de compras, poderemos ter duas situações:
  - 01: Não existem produtos no carrinho:
    - O usuário não poderá sair da pagina atual e deverá ser exibido uma mensagem informativa: 'Carrinho vazio. Por favor adicione produtos'
  - 02: Existem produtos no carrinho:
    - O usuário deverá ser redirecionado para uma pagina contendo o menu default, a listagem de itens do carrinho e dois botões 'Finalizar Compra' (deverá remover os itens do estoque) e 'Abandonar' (deverá manter os itens no estoque).
    - Ao finalizar o checkout deverá exibir um Dialog com mensagem de Sucesso e DELETAR os itens do estoque (DELETE http://localhost:3000/stock/:id) e inserir na lista de checkout finalizado (POST http://localhost:3000/checkout)

## Requisições para o Servidor:

- As requisições para o servidor devem conter um Header default: 'Authentication' enviando uma string randomica de 16 caracteres para cada requisição.

## Pontos de Atenção:

- Dois usuários podem tentar fazer checkout do mesmo produto ao mesmo tempo. Seu sistema deve tratar concorrencia.
- O carrinho pode ficar disponivel na sessão do usuário até um tempo limite de 24horas.
- Tratar possiveis erros do servidor, exemplo: Subir a aplicação com o servidor offline ou falhas de comunicação com o servidor, timeouts, etc.

