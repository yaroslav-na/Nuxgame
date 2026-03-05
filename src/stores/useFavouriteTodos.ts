import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useTodosStore } from './useTodos'
import type { FavouriteTodoItem } from '@/entities/todo'
import { createLocalStorageManager } from '@/utils/localStorage'

const favouriteTodosLSManager = createLocalStorageManager<number[]>('favouriteTodoIds', [])

export const useFavouriteTodosStore = defineStore('favouriteTodos', () => {
  const todosStore = useTodosStore()
  const favouriteTodoIds = ref<number[]>([])
  const todosWithFavouriteFlag = computed<FavouriteTodoItem[]>(() =>
    todosStore.todos.map((todo) => ({
      ...todo,
      favourite: favouriteTodoIds.value.includes(todo.id),
    })),
  )

  function loadFavouriteTodoIds() {
    favouriteTodoIds.value = favouriteTodosLSManager.get()
  }

  function toggleFavouriteTodoId(id: number) {
    const index = favouriteTodoIds.value.indexOf(id)

    if (index === -1) {
      favouriteTodoIds.value.push(id)
    } else {
      favouriteTodoIds.value.splice(index, 1)
    }

    favouriteTodosLSManager.set(favouriteTodoIds.value)
  }

  function removeFavouriteTodoId(id: number) {
    const index = favouriteTodoIds.value.indexOf(id)

    if (index !== -1) {
      favouriteTodoIds.value.splice(index, 1)
      favouriteTodosLSManager.set(favouriteTodoIds.value)
    }
  }

  return {
    todosWithFavouriteFlag,
    loadFavouriteTodoIds,
    toggleFavouriteTodoId,
    removeFavouriteTodoId,
  }
})
