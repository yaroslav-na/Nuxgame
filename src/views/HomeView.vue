<script setup lang="ts">
import TodoItem from '@/components/TodoItem.vue'
import HomeFilters from '@/components/HomeFilters.vue'
import CreateTodoForm from '@/components/CreateTodoForm.vue'
import { useFilteredFavouriteTodosStore } from '@/stores/useFilteredFavouriteTodos'

const filterStore = useFilteredFavouriteTodosStore()
</script>

<template>
  <div class="home container">
    <CreateTodoForm class="home__form" />
    <h2 class="todo-section__heading">Todos</h2>
    <HomeFilters />
    <section class="todo-section">
      <div v-if="filterStore.filteredTodos.length" class="todo-list">
        <TodoItem
          v-for="todo in filterStore.filteredTodos"
          :key="todo.id"
          :id="todo.id"
          :title="todo.title"
          :user-id="todo.userId"
          :completed="todo.completed"
          :favourite="todo.favourite"
        />
      </div>
      <p v-else class="todo-section__empty">No todos found.</p>
    </section>
  </div>
</template>

<style scoped>
.home {
  padding-block: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.home__form {
  max-width: 600px;
  width: 100%;
  align-self: center;
}

.todo-section {
  max-width: 800px;
  width: 100%;
  align-self: center;
}

.todo-section__heading {
  margin-top: 24px;
  font-size: 20px;
  font-weight: 600;
  color: var(--on-primary);
  line-height: 1;
}

.todo-section__count {
  font-weight: 400;
  font-size: 16px;
  color: var(--bg-card-dark);
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.todo-section__empty {
  color: var(--bg-card-dark);
  text-align: center;
  padding: 24px;
}
</style>
