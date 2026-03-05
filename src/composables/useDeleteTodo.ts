import { REQUEST_STATUS, useRequestStatus, type RequestStatus } from './useRequestStatus'
import { createAbortableRequest } from '@/api/helpers'
import { ref } from 'vue'
import * as todosApi from '@/api/todos'
import { useTodosStore } from '@/stores/useTodos'
import { useFavouriteTodosStore } from '@/stores/useFavouriteTodos'

export const useDeleteTodo = () => {
  const deleteTodoStatus = ref<RequestStatus>(REQUEST_STATUS.IDLE)
  const deleteTodoError = ref<string>('')
  const deleteTodoStatusInfo = useRequestStatus(deleteTodoStatus)
  const todosStore = useTodosStore()
  const favouriteTodosStore = useFavouriteTodosStore()

  const deleteTodo = createAbortableRequest((ac, id: number) => {
    deleteTodoStatus.value = REQUEST_STATUS.LOADING
    deleteTodoError.value = ''

    return todosApi.deleteTodo(id, ac.signal).then((response) => {
      if (response.isAborted) {
        deleteTodoStatus.value = REQUEST_STATUS.IDLE
        return
      }

      if (!response.isSuccess) {
        deleteTodoError.value = response.error
        deleteTodoStatus.value = REQUEST_STATUS.ERROR
        return
      }

      todosStore.removeTodo(id)
      favouriteTodosStore.removeFavouriteTodoId(id)
      deleteTodoStatus.value = REQUEST_STATUS.SUCCESS
    })
  })

  return {
    deleteTodo,
    deleteTodoError,
    ...deleteTodoStatusInfo,
  }
}
