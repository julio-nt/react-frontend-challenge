# Instruções para o projeto Libris

## Stacks utilizadas

- Core: React 18+, TypeScript (Strict), Vite.
- Server State & Cache: TanStack Query.
- Client State: Zustand.
- Routing: TanStack Router.
- UI Components: Shadcn/ui + TailwindCSS.
- Formulários: React Hook Form + Zod - (validação).
- Testes: Vitest + React Testing Library.

## Pré-requisitos

Antes de iniciar, você precisará de:

- **Node.js** (versão recomendada: 18+)
- Uma **chave de API do Google** com permissão para a [Google Books API](https://developers.google.com/books/docs/v1/getting_started)

## Configurando o projeto antes de iniciar

1. Copie o arquivo `.env.example` e renomeie a copia apenas `.env`

2. Insira em `VITE_GOOGLE_BOOKS_API_KEY` uma chave API google com permissão para utilizar **Google Books API**

## Rodando o projeto

```bash
npm install
```

```bash
npm run dev
```

## Guia de uso

É necessário cadastrar uma conta ao acessar

Acesse em `http://localhost:5173`
