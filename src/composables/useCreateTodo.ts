import type { TodoItem } from '@/entities/todo'
import { REQUEST_STATUS, useRequestStatus, type RequestStatus } from './useRequestStatus'
import { createAbortableRequest } from '@/api/helpers'
import { ref } from 'vue'
import * as todosApi from '@/api/todos'
import { useTodosStore } from '@/stores/useTodos'

export const useCreateTodo = () => {
  const createTodoStatus = ref<RequestStatus>(REQUEST_STATUS.IDLE)
  const createTodoError = ref<string>('')
  const createTodoStatusInfo = useRequestStatus(createTodoStatus)
  const todosStore = useTodosStore()

  const createTodo = createAbortableRequest((ac, todo: Pick<TodoItem, 'title' | 'userId'>) => {
    createTodoStatus.value = REQUEST_STATUS.LOADING
    createTodoError.value = ''

    return todosApi
      .createTodo({ title: todo.title, userId: todo.userId, completed: false }, ac.signal)
      .then((response) => {
        if (response.isAborted) {
          createTodoStatus.value = REQUEST_STATUS.IDLE
          return
        }

        if (!response.isSuccess) {
          createTodoError.value = response.error
          createTodoStatus.value = REQUEST_STATUS.ERROR
          return
        }

        todosStore.addTodo(response.value)
        createTodoStatus.value = REQUEST_STATUS.SUCCESS
      })
  })

  return {
    createTodo,
    createTodoError,
    ...createTodoStatusInfo,
  }
}
