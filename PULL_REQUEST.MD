## Desafio Corelab- Célio Fagundes Pieczarka

Solução criada utilizando React/Typescript no frontend e AdonisJs/Typescript como API e banco de dados Postgres.

Frontend hospedado na Vercel e API/Banco de dados na Heroku.

Versão de produção na vercel [ACESSAR LINK](https://corelab-web-challenge-celiofagundes.vercel.app/)
Link da API na Heroku: [LINK](https://corelab-api.herokuapp.com/vehicles)
(Em caso de erro ou dados não carregarem os serviços podem demorar alguns segundos para sair da inatividade, recarregue a página)

Para rodar localmente: 
- No frontend , caso queira usar a API local, troque a url da variavel API no arquivo lib/api para "http://localhost:3333" (ou qualquer outra porta que esteja rodando o backend).</br>
Comando para rodar `npm run start`
- No backend, crie um um arquivo .env baseado no .env.example preenchendo com as informações do seu banco de dados postgres local. Rode o comando `node ace migration:run` para criar a tabela de veículos e `npm run dev` para rodar. Caso queira preencher alguns veículos, faça uma requisição POST com os dados do arquivo `vehicle_data.json`

## Detalhes

### API:

Rotas:

- GET /vehicle</br>
  Retorna todos os veículos do banco de dados. Aceita os parâmetros de query:
  - keyword: Caso exista, filtra os veículos que alguma propiedade possua/seja a keyword
  - color: Caso exista, filtra os veículos que possuem a cor igual o valor de color
  - brand: Caso exista, filtra os veículos que possuem a marca igual o valor de brand
  - year: Caso exista, filtra os veículos que possuem o ano igual o valor de year
  - minValue: Caso exista, filtra os veículos que possuem o preço menor/igual a minValue
  - maxValue: Caso exista, filtra os veículos que possuem o preço maior/igual a minValue
- GET  /vehicles/:id</br>
  Retorna o veículo que corresponda ao id
- POST /vehicles</br>
  Cria um novo veículo
- PUT  /vehicles/:id</br>
  Edita o veículo que corresponda ao id
- DELETE /vehicles/:id</br>
  Excluí o veículo que corresponda ao id
- POST /vehicles/favorite/:id</br>
  Inverte o valor de is_favorite do veículo que corresponde o id
- POST /vehicles/many</br>
  Cria multiplos veículos

Testes: Testes funcionais utilizando Japa. Os testes rodam as migrations e seeders a cada teste, por isso é preciso de um banco de dados,  crie uma variavel .env.test e substitua PG_DB_NAME para outro banco de testes para não perder os dados do banco real.<br>
Tecnologias utilizadas:

- Deploy: Heroku
- Framework: AdonisJs
- Linguagem: Typescript
- Banco de dados: Posgres
- ORM: Lucid
- Formatação/Organização: Eslint/Prettier
- Testes: Japa

### Web:

Funcionamento:

- Páginas: Homepage, criar veículo e editar veículo
- Comunicação com a API: Todas funções criadas na pasta lib, utilizando axios e useSWR
- Busca e filtragem: A homepage possui um objeto useState queryParams que possui todos os paramêtros para enviar para a API. Estes valores são enviados para o useSWR e toda vez que o estado atualizar ao buscar uma nova palavra ou alterar filtros a requisição é feita novamente e os dados atualizados.
- Criação e edição: Para validar e gerenciar os formulário utilizei os pacotes Formik(gerenciar) e Yup(validar).

Tecnologias utilizadas:

- Deploy: Vercel
- Framework: React
- Linguagem: Typescript
- Formatação/Organização: Eslint/Prettier
- Estilização: SCSS/ Mobile First
- Data fetching: Axios e SWR
- Criação e validação de formulários: Formik e Yup
- Icones: React Icons
- Rotas: React Router Dom
