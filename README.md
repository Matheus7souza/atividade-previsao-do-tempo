# 🌤️ Consulta de Previsão do Tempo — BrasilAPI

Aplicação web responsiva desenvolvida em **HTML5, CSS3 e JavaScript (ES6+)** para consulta de cidades e previsão meteorológica em tempo real no Brasil, consumindo os serviços da **BrasilAPI (CPTEC)**.

---

## 🚀 Funcionalidades

- 🔍 **Busca Dinâmica de Cidades:** Permite pesquisar qualquer município brasileiro pelo nome ao pressionar `Enter`.
- 📍 **Seleção de Localidade:** Apresenta uma lista interativa das cidades encontradas para seleção precisa da localidade (incluindo o estado/UF).
- 📅 **Previsão Detalhada:** Exibe as condições do tempo, temperatura mínima e máxima, e índice UV para os próximos dias.
- ⚡ **Requisições Assíncronas:** Consumo de dados via `fetch` de forma totalmente assíncrona (`async/await`).
- 🎨 **Interface Intuitiva:** Layout moderno, limpo e com feedback visual de carregamento (*loading*) e tratamento de erros para o usuário.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estruturação semântica da aplicação.
- **CSS3:** Estilização responsiva, layout em Grid e Flexbox.
- **JavaScript (ES6+):** Manipulação do DOM, gestão de eventos e integração com API REST via `fetch` / `Promises`.
- **API:** [BrasilAPI - Módulo CPTEC](https://brasilapi.com.br/docs#tag/CPTEC) (Centro de Previsão de Tempo e Estudos Climáticos).

---

## 📁 Estrutura do Projeto

```text
atividade-previsao-do-tempo/
├── css/
│   └── index.css      # Estilização da interface e layout
├── js/
│   └── index.js       # Lógica da aplicação, integração com API e DOM
├── index.html         # Estrutura principal da página
└── README.md          # Documentação do projeto
