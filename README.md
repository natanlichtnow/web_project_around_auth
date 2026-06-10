# EUA Afora — Registro e Autorização

## Descrição

Aplicação React com registro e autorização de usuários. Permite criar conta, fazer login, e ao estar autenticado, visualizar, curtir e adicionar cartões de locais dos EUA.

## Funcionalidades

- Registro e login de usuários com JWT
- Rota protegida: apenas usuários autenticados acessam a página principal
- Visualização e edição de perfil e avatar
- Adição, curtida e remoção de cartões
- Token salvo no localStorage para persistência de sessão
- InfoTooltip de feedback para registro bem/mal sucedido

## Tecnologias

- **React** (CRA) — biblioteca de interface
- **React Router DOM v5** — roteamento com `Switch`, `Route`, `Redirect`, `useHistory`
- **Context API** — compartilhamento do `currentUser` entre componentes
- **localStorage** — persistência do JWT
- **CSS BEM** — metodologia de nomenclatura de classes
- **Fetch API** — requisições ao backend

## Como rodar

```bash
npm install
npm start
```
