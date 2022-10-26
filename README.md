# QUANTO TÁ?
# React Native + Expo + Typescript


## :computer: O Projeto

Desenvolver um aplicativo para busca e listagem de produtos que fazem parte do mix de supermecado, e visualizar os preços informados para estes nos mercados cadastrados na plataforma.

Foi utilizado o `expo` para a construção deste projeto, e a API utilizada é de desenvolvimento proprio [node-google-spreadshet](https://github.com/ArthurFCouto/node-google-spreadshet).

### :gear: Funcionalidades

Nesta primeira versão, estão disponíveis as seguintes funcionalidades:

- :white_check_mark: **Listagem de todos os produtos**: Listar todos os produtos já cadastrados na API.

- :white_check_mark: **Busca pelo código de barras**: Buscar um produto especifico pelo código de barras GTIN/EAN, seja digitando ou utilizando a camera do aparelho como scanner.

- :white_check_mark: **Detalhes do produto**: Detalhar as informações do produto e visualizar sua imagem em tela cheia.

- :white_check_mark: **Adicionar preço**: Informar um novo preço para o produto pesquisado.

- :white_check_mark: **Realizar login**: Acessar sua conta.

Para a próxima versão estão previstas as seguintes funcionalidades:

- :white_large_square: **Salvar favoritos**: Possibilidade de salvar os itens mais buscados em uma lista.

- :white_large_square: **Cadastrar novo usuário**: Possibilidade de cadastrar novos usuários.

- :white_large_square: **Adição de filtros**: Possibilidade de realizar buscas mais específicas.

### :bookmark_tabs: Conceitos abordados

- Uso do `stack navigation` e `bottom navigation`, e o envio de informação entre diferentes telas e componentes.

- `UseContex` para trabalhar com variáveis de contexto.

- Renderizações condicionais, `hooks` personalizados e introdução a biblioteca `animated`.

- Uso de `type` e `interface`.

- Consumo de api com o uso da lib [axios](https://github.com/axios/axios).

- Estilização com o [Styled-Components](https://www.styled-components.com/).

### :label: Notas

- Este projeto é para uso pessoal e fins de estudo portanto, há diversas melhorias e funções a serem implementadas que serão incrementadas no decorrer dos estudos.

- O `typescript` ainda não está sendo utilizado em todo seu potencial, como é um projeto para prática de estudos, no momento está "apenas" fornecendo a tipagem de variáveis.

## :rocket: Tecnologias

-  [React Native](https://reactnative.dev/)
-  [Styled-components](https://www.styled-components.com/)
-  [TypeScript](https://www.typescriptlang.org/)
-  [Expo](https://docs.expo.dev/)
-  [Axios](https://github.com/axios/axios)