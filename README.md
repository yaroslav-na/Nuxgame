# Nuxgame Todo App

A Vue 3 todo management application with user authentication, CRUD operations, and favourites — built as a technical assessment.

## Features

- **User authentication** — register by selecting a user from JSONPlaceholder, with route guards for protected/guest-only pages
- **Todo CRUD** — fetch, create, update, and delete todos via the JSONPlaceholder API
- **Favourites** — mark todos as favourites, persisted to localStorage
- **Filtering** — filter todos on the home page
- **Debounced inputs** — custom composable for search/filter debouncing

## Tech Stack

- **Vue 3** with Composition API (`<script setup>`)
- **TypeScript**
- **Vite** — dev server and build tooling
- **Vue Router** — hash-based routing with navigation guards
- **Pinia** — state management
- **ESLint + Prettier** — code quality with lint-staged and Husky pre-commit hooks

## Project Structure

```
src/
├── api/            # API calls (todos, users) via fetch + helpers
├── components/     # Reusable components (AppHeader, FormInput, TodoItem, etc.)
├── composables/    # Composables (useCreateTodo, useDeleteTodo, useRequestStatus, etc.)
├── entities/       # TypeScript types (TodoItem, User)
├── stores/         # Pinia stores (auth, todos, users, favourites)
├── utils/          # Utility functions (localStorage)
├── views/          # Route views (HomeView, RegisterView)
├── router/         # Vue Router config
├── App.vue
└── main.ts
```

## Getting Started

### Prerequisites

- Node.js 22+
- npm

### Install dependencies

```sh
npm install
```

### Development

```sh
npm run dev
```

### Build for production

```sh
npm run build
```

### Lint and format

```sh
npm run lint
npm run format
```

## API

The app uses [JSONPlaceholder](https://jsonplaceholder.typicode.com) as a mock REST API for both users and todos.
