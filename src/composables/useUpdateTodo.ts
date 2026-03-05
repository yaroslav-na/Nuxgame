import type { TodoItem } from '@/entities/todo'
import { REQUEST_STATUS, useRequestStatus, type RequestStatus } from './useRequestStatus'
import { createAbortableRequest } from '@/api/helpers'
import { ref } from 'vue'
import * as todosApi from '@/api/todos'
import { useTodosStore } from '@/stores/useTodos'

export const useUpdateTodo = () => {
  const updateTodoStatus = ref<RequestStatus>(REQUEST_STATUS.IDLE)
  const updateTodoError = ref<string>('')
  const updateTodoStatusInfo = useRequestStatus(updateTodoStatus)
  const todosStore = useTodosStore()

  const updateTodo = createAbortableRequest(
    (ac, todo: Pick<TodoItem, 'id'> & Partial<Omit<TodoItem, 'id'>>) => {
      updateTodoStatus.value = REQUEST_STATUS.LOADING
      updateTodoError.value = ''

      return todosApi.updateTodo(todo, ac.signal).then((response) => {
        if (response.isAborted) {
          updateTodoStatus.value = REQUEST_STATUS.IDLE
          return
        }

        if (!response.isSuccess) {
          updateTodoError.value = response.error
          updateTodoStatus.value = REQUEST_STATUS.ERROR
          return
        }

        todosStore.updateTodo(response.value)
        updateTodoStatus.value = REQUEST_STATUS.SUCCESS
      })
    },
  )

  return {
    updateTodo,
    updateTodoError,
    updateTodoStatus,
    ...updateTodoStatusInfo,
  }
}
