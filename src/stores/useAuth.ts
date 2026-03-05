import { ref } from 'vue'
import { useUsersStore } from './useUsers'
import type { User } from '@/entities/user'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const usersStore = useUsersStore()
  const authenticatedUser = ref<null | User>(null)

  const register = (phone: string, username: string) => {
    const preparedPhone = phone.toLowerCase().trim()
    const preparedUsername = username.toLowerCase().trim()

    const foundUser = usersStore.users.find(
      (user) =>
        user.phone.toLowerCase() === preparedPhone &&
        user.username.toLowerCase() === preparedUsername,
    )

    if (foundUser) authenticatedUser.value = foundUser
    return !!foundUser
  }

  return {
    register,
    authenticatedUser,
  }
})
