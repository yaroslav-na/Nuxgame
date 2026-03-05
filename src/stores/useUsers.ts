import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createAbortableRequest } from '@/api/helpers'
import * as usersApi from '@/api/users'
import {
  REQUEST_STATUS,
  useRequestStatus,
  type RequestStatus,
} from '@/composables/useRequestStatus'
import type { User } from '@/entities/user'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const status = ref<RequestStatus>(REQUEST_STATUS.IDLE)
  const errorMessage = ref<string>('')
  const statusInfo = useRequestStatus(status)

  const getUsers = createAbortableRequest(async (ac) => {
    users.value = []
    status.value = REQUEST_STATUS.LOADING
    errorMessage.value = ''

    return usersApi.getUsers(ac).then((response) => {
      if (response.isAborted) {
        status.value = REQUEST_STATUS.IDLE
        return
      }

      if (!response.isSuccess) {
        errorMessage.value = response.error
        status.value = REQUEST_STATUS.ERROR
        return
      }

      users.value = response.value
      status.value = REQUEST_STATUS.SUCCESS
    })
  })

  return {
    users,
    getUsers,
    statusInfo,
  }
})
