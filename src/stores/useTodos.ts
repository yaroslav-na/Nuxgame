import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createAbortableRequest } from '@/api/helpers'
import * as todosApi from '@/api/todos'
import {
  REQUEST_STATUS,
  useRequestStatus,
  type RequestStatus,
} from '@/composables/useRequestStatus'
import type { TodoItem } from '@/entities/todo'

export const useTodosStore = defineStore('todos', () => {
  const todos = ref<TodoItem[]>([])

  const getTodosStatus = ref<RequestStatus>(REQUEST_STATUS.IDLE)
  const getTodosError = ref<string>('')
  const getTodosStatusInfo = useRequestStatus(getTodosStatus)

  const getTodos = createAbortableRequest((ac) => {
    getTodosStatus.value = REQUEST_STATUS.LOADING
    getTodosError.value = ''

    return todosApi.getTodos(ac.signal).then((response) => {
      if (response.isAborted) {
        getTodosStatus.value = REQUEST_STATUS.IDLE
        return
      }

      if (!response.isSuccess) {
        getTodosError.value = response.error
        getTodosStatus.value = REQUEST_STATUS.ERROR
        return
      }

      todos.value = response.value
      getTodosStatus.value = REQUEST_STATUS.SUCCESS
    })
  })

  const updateTodo = (updatedTodoItem: Partial<TodoItem>) => {
    const index = todos.value.findIndex((t) => t.id === updatedTodoItem.id)
    if (index !== -1) {
      todos.value[index] = { ...todos.value[index], ...updatedTodoItem }
    }
  }

  const addTodo = (createdTodo: TodoItem) => {
    todos.value.unshift(createdTodo)
  }

  const removeTodo = (id: number) => {
    todos.value = todos.value.filter((t) => t.id !== id)
  }

  return {
    todos,
    getTodos,
    getTodosError,
    ...getTodosStatusInfo,
    updateTodo,
    addTodo,
    removeTodo,
  }
})
