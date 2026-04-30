# Arquitetura do Projeto — Libris

O Libris adota uma arquitetura **modular por feature**, inspirada no Feature-Sliced Design (FSD). O objetivo é manter regras de negócio isoladas dos componentes de UI e garantir que cada módulo seja independente e fácil de evoluir.

## Estrutura de Pastas

```
src/
├── core/        # Infraestrutura global (HTTP, roteador, query client, toast)
├── modules/     # Módulos de feature (account, book, bookshelf, library)
├── shared/      # Componentes, hooks, stores e utilitários reutilizáveis
└── tests/       # Testes unitários organizados por feature
```

### Dentro de cada módulo

```
modules/<feature>/
├── components/  # Componentes visuais da feature
├── model/       # Tipos e modelos
├── pages/       # Componentes de página vinculados às rotas
└── useCase/     # Hooks com a lógica de negócio (ex: useSaveBook, useSearchBook)
```

## Decisões Técnicas

**TanStack Router** — Roteamento com tipagem segura e suporte nativo a rotas privadas e parâmetros de URL tipados.

**TanStack Query** — Gerencia o estado do servidor (cache, loading, erros). As `QueryKeys` são centralizadas em `core/query/interface.ts` para evitar inconsistências e facilitar a utilização de cache para atualização de dados sem necessitar espera da resposta da API (como o projeto não tem API além da busca, isso foi utilizado de forma simulada).

**Zustand + `persist`** — Estado client-side leve. Stores como `auth-store` e `bookshelf-store` sobrevivem ao refresh via `localStorage`, sem boilerplate.

**Autenticação simulada** — Sem backend real. O registro e login são gerenciados via `useRegisterStore` e `useAuthStore` com persistência local. O token é fictício, mas o fluxo de rotas privadas é funcional.

**HTTP Client próprio** — Wrapper simples sobre `fetch` (em `core/http`) que injeta a API key automaticamente, evitando repetição e centralizando o tratamento de erros.

**React Hook Form + Zod** — Validação declarativa nos formulários. Os schemas Zod servem também como source of truth dos tipos dos formulários.

## Desafios com Google Books API

**`totalItems` inconsistente** — O campo que indica o total de resultados retorna valores imprecisos e variáveis para a mesma busca, o que inviabiliza uma paginação baseada nele. A solução foi controlar a paginação via `startIndex` e desabilitar o "próximo" quando a página retorna menos itens que o esperado.

**`orderBy` sem efeito** — O parâmetro de ordenação não produz diferença perceptível nos resultados. Foi mantido na interface por ser um requisito, mas documentado como limitação da API.

**Dados incompletos** — Muitos livros retornam sem capa, sinopse, autores, editora e até titulo. Todos os campos opcionais do modelo `Book` são tratados defensivamente, com fallbacks visuais para evitar erros de renderização.
