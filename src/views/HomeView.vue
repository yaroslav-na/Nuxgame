<script setup lang="ts">
import TodoItem from '@/components/TodoItem.vue'
import HomeFilters from '@/components/HomeFilters.vue'
import TodoForm from '@/components/TodoForm.vue'

type TodoItem = {
  userId: number
  id: number
  title: string
  completed: boolean
  favourite: boolean
}

const todos: TodoItem[] = [
  {
    userId: 1,
    id: 1,
    title: 'Sample Todo',
    completed: true,
    favourite: false,
  },
  {
    userId: 2,
    id: 2,
    title: 'Another Todo',
    completed: false,
    favourite: true,
  },
]
</script>

<template>
  <div class="home container">
    <TodoForm class="home__form" />
    <h2 class="todo-section__heading">Todos</h2>
    <HomeFilters />
    <section class="todo-section">
      <div v-if="todos.length" class="todo-list">
        <TodoItem
          v-for="todo in todos"
          :key="todo.id"
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
  max-width: 800px;
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
