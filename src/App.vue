<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import { useUsersStore } from './stores/useUsers'
import { useTodosStore } from './stores/useTodos'
import { useFavouriteTodosStore } from './stores/useFavouriteTodos'
import AppHeader from './components/AppHeader.vue'

const usersStore = useUsersStore()
const todosStore = useTodosStore()
const favouriteTodos = useFavouriteTodosStore()

onMounted(() => {
  usersStore.getUsers()
  todosStore.getTodos()
  favouriteTodos.loadFavouriteTodoIds()
})
onUnmounted(() => {
  usersStore.getUsers.abort()
  todosStore.getTodos.abort()
})
</script>

<template>
  <div class="page">
    <AppHeader class="page__header" />
    <main class="page__main">
      <RouterView />
    </main>
    <footer class="page__footer"></footer>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page__main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.page__footer {
  height: 270px;
  background: var(--bg-dark);
}
</style>
