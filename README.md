# Nebula Nexus

Aplicacao web em React + TypeScript para visualizar imagens astronomicas da NASA, incluindo imagem do dia, galeria aleatoria, fotos dos rovers de Marte e busca por data.

<p align="center">
  <img src="src/assets/logoEscrita.png" alt="Nebula Nexus" width="800">
</p>

## Funcionalidades

- **Imagem do Dia**: exibe a APOD da NASA com titulo, midia e descricao.
- **Galeria de Imagens Espaciais**: carrega imagens aleatorias da APOD e permite virar cards para ler a explicacao.
- **Exploracao de Marte**: exibe fotos capturadas pelos rovers Curiosity, Opportunity e Spirit.
- **Imagem por Data**: busca a APOD para uma data escolhida pelo usuario.

## Configuracao

1. Instale as dependencias:

   ```bash
   npm install
   ```

2. Crie um arquivo `.env` na raiz do projeto seguindo o `.env.example`:

   ```bash
   REACT_APP_NASA_API_KEY=sua_chave_da_nasa
   ```

3. Inicie o projeto:

   ```bash
   npm start
   ```

A aplicacao roda em [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm start`: inicia o ambiente de desenvolvimento.
- `npm run build`: gera a versao de producao.
- `npm test`: executa os testes configurados pelo Create React App.

## Tecnologias

- React 18
- TypeScript
- Axios
- Styled Components
- NASA APIs

## Autores

- [Victor Dala](https://github.com/Victordplima)
- [Savio Carlos](https://github.com/SavioCarlos)
