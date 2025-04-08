# PontOn

#### Grupo
Jonas Nogueira Neto, Lucas D., Gabriel Teixeira

PontOn é uma aplicação para registro de pontos com funcionalidades de captura de imagem, geolocalização e armazenamento local. O objetivo é permitir que os usuários registrem seus pontos de forma prática e visualizem os registros posteriormente.

## Funcionalidades

- **Registro de Ponto**: Permite que o usuário registre seu ponto informando o nome, capturando uma imagem da câmera e salvando a localização atual.
- **Captura de Imagem**: Utiliza a câmera do dispositivo para capturar uma imagem no momento do registro.
- **Geolocalização**: Obtém a localização atual do usuário (latitude e longitude) e converte para o nome da rua utilizando a API OpenStreetMap.
- **Armazenamento Local**: Salva os registros de ponto no `localStorage` do navegador.
- **Exibição de Pontos**: Lista os pontos registrados com informações como nome, data, hora, localização e imagem.
- **Relógio Atualizado**: Exibe um relógio em tempo real na página principal.

## APIs Utilizadas

- **OpenStreetMap Nominatim API**: Para converter coordenadas geográficas (latitude e longitude) no nome da rua correspondente.

## Estrutura do Projeto

- `index.html`: Página principal para registro de pontos.
- `pontos.html`: Página para exibição dos pontos registrados.
- `styles.css`: Estilos globais da aplicação.
- `script.js`: Lógica para registro de pontos, captura de imagem e geolocalização.
- `pontos.js`: Lógica para exibição dos pontos registrados.

## Como Usar

1. Acesse a página principal (`index.html`).
2. Digite seu nome no campo de texto.
3. Permita o acesso à câmera e à localização do dispositivo.
4. Clique no botão "Registrar ponto!" para salvar o registro.
5. Acesse a página "Pontos" para visualizar os registros salvos.

## Requisitos

- Navegador com suporte a JavaScript, geolocalização e acesso à câmera.
- Conexão com a internet para uso da API OpenStreetMap.