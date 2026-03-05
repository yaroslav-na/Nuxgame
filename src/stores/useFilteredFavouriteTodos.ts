import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useFavouriteTodosStore } from './useFavouriteTodos'
import { useDebouncedValue } from '@/composables/useDebouncedValue'

type FilteredTodosState = {
  result: number[]
  filters: {
    title: string
    status: string
    userId: number | null
    filteredListId: number
  }
}

export const useFilteredFavouriteTodosStore = defineStore('filteredFavouriteTodos', () => {
  const userId = ref<number | null>(null)
  const title = ref('')
  const debouncedTitle = useDebouncedValue(title)
  const status = ref('')
  const favouriteTodosStore = useFavouriteTodosStore()
  const filteredListId = ref(1)

  const filteredTodosState = computed<FilteredTodosState>((prevValue) => {
    if (
      prevValue &&
      prevValue.filters.status === status.value &&
      prevValue.filters.title === debouncedTitle.value &&
      prevValue.filters.userId === userId.value &&
      prevValue.filters.filteredListId === filteredListId.value
    ) {
      return prevValue
    }
    let filteredTodos = favouriteTodosStore.todosWithFavouriteFlag

    if (userId.value !== null) {
      filteredTodos = filteredTodos.filter((todo) => todo.userId === userId.value)
    }

    if (debouncedTitle.value) {
      const search = debouncedTitle.value.toLowerCase()
      filteredTodos = filteredTodos.filter((todo) => todo.title.toLowerCase().includes(search))
    }

    if (status.value === 'completed') {
      filteredTodos = filteredTodos.filter((todo) => todo.completed)
    } else if (status.value === 'uncompleted') {
      filteredTodos = filteredTodos.filter((todo) => !todo.completed)
    } else if (status.value === 'favourites') {
      filteredTodos = filteredTodos.filter((todo) => todo.favourite)
    }

    const result = filteredTodos.map((todoItem) => todoItem.id)

    return {
      result,
      filters: {
        title: debouncedTitle.value,
        status: status.value,
        userId: userId.value,
        filteredListId: filteredListId.value,
      },
    }
  })

  const filteredTodos = computed(() => {
    const ids = filteredTodosState.value.result
    return favouriteTodosStore.todosWithFavouriteFlag.filter((todo) => ids.includes(todo.id))
  })

  const resetFilters = () => {
    userId.value = null
    title.value = ''
    status.value = ''
    filteredListId.value++
  }

  return {
    userId,
    title,
    status,
    filteredTodos,
    resetFilters,
  }
})
