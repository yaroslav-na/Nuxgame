<script setup lang="ts">
import { useDeleteTodo } from '@/composables/useDeleteTodo'
import { useUpdateTodo } from '@/composables/useUpdateTodo'
import type { FavouriteTodoItem } from '@/entities/todo'
import { useFavouriteTodosStore } from '@/stores/useFavouriteTodos'
import { computed, onUnmounted } from 'vue'

const props = defineProps<FavouriteTodoItem>()
const favouriteTodoItem = useFavouriteTodosStore()
const {
  updateTodo,
  isLoading: isLoadingUpdate,
  updateTodoStatus,
  updateTodoError,
} = useUpdateTodo()
const { deleteTodo, isLoading: isLoadingDelete, deleteTodoError } = useDeleteTodo()
const isLoading = computed(() => isLoadingDelete.value || isLoadingUpdate.value)

const toggleCompleted = () => {
  updateTodo({ id: props.id, completed: !props.completed })
}

const handleDeleteTodo = () => {
  deleteTodo(props.id)
}

onUnmounted(() => {
  updateTodo.abort()
  deleteTodo.abort()
})
</script>

<template>
  <div
    class="todo-item"
    :class="{
      'todo-item--completed': props.completed,
      'todo-item--loading': isLoading,
    }"
  >
    <input
      class="todo-item__check"
      type="checkbox"
      :key="updateTodoStatus"
      :checked="props.completed"
      @change="toggleCompleted"
    />

    <div class="todo-item__content">
      <span class="todo-item__title">{{ props.title }}</span>
      <span class="todo-item__user">User #{{ props.userId }}</span>
    </div>

    <div class="todo-item__actions">
      <button
        class="todo-item__fav"
        :class="{ 'todo-item__fav--active': props.favourite }"
        title="Toggle favourite"
        @click="favouriteTodoItem.toggleFavouriteTodoId(props.id)"
      >
        {{ props.favourite ? 'Remove from favourites' : 'Add to favourites' }}
      </button>
      <button class="todo-item__delete" title="Delete" @click="handleDeleteTodo">Delete</button>
    </div>

    <span v-if="updateTodoError" class="todo-item__error">{{ updateTodoError }}</span>
    <span v-if="deleteTodoError" class="todo-item__error">{{ deleteTodoError }}</span>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px;
  background: var(--bg-card-bright);
  border-radius: 4px;
  transition:
    opacity 0.15s ease,
    background-color 0.15s ease;
}

.todo-item--completed {
  background: var(--bg-card);
}

.todo-item--loading {
  opacity: 0.5;
  pointer-events: none;
}

.todo-item--completed .todo-item__title {
  color: var(--txt-muted);
  text-decoration: line-through;
}

.todo-item__check {
  cursor: pointer;
  accent-color: var(--primary);
  width: 18px;
  height: 18px;
}

.todo-item__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.todo-item__title {
  font-size: 16px;
  word-break: break-word;
}

.todo-item__user {
  font-size: 12px;
  color: var(--txt-muted);
}

.todo-item__actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.todo-item__fav,
.todo-item__delete {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 4px;
  line-height: 1;
  border-radius: 2px;
}

.todo-item__fav:hover,
.todo-item__delete:hover {
  background: var(--bg-card);
}

.todo-item--completed .todo-item__fav:hover,
.todo-item--completed .todo-item__delete:hover {
  background: var(--bg-card-dark);
}

.todo-item__fav {
  color: var(--txt-muted);
}

.todo-item__fav--active {
  color: var(--fav);
}

.todo-item__delete {
  color: var(--error);
}

.todo-item__error {
  width: 100%;
  font-size: 12px;
  color: var(--error);
}
</style>
