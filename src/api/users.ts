import type { User } from '@/entities/user'
import { handleRequest } from './helpers'

export const getUsers = async (ac: AbortController) => {
  return handleRequest<User[]>(
    fetch('https://jsonplaceholder.typicode.com/users', {
      signal: ac.signal,
    }).then((response) => response.json()),
  )
}
