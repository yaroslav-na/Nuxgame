import type { TodoItem } from '@/entities/todo'
import { handleRequest } from './helpers'

export const getTodos = async (as?: AbortSignal) => {
  return handleRequest<TodoItem[]>(
    fetch('https://jsonplaceholder.typicode.com/todos', {
      signal: as,
    }).then((response) => response.json()),
  )
}

export const createTodo = async (todo: Omit<TodoItem, 'id'>, as?: AbortSignal) => {
  return handleRequest<TodoItem>(
    fetch('https://jsonplaceholder.typicode.com/todos', {
      body: JSON.stringify(todo),
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      signal: as,
    }).then((response) => response.json()),
  )
}

export const deleteTodo = async (id: number, as?: AbortSignal) => {
  return handleRequest<void>(
    fetch('https://jsonplaceholder.typicode.com/todos/' + id, {
      method: 'DELETE',
      signal: as,
    }).then(() => undefined),
  )
}

type UpdateTodoRequest = Pick<TodoItem, 'id'> & Partial<Omit<TodoItem, 'id'>>
type UpdateTodoResponse = UpdateTodoRequest

export const updateTodo = async (todo: UpdateTodoRequest, as?: AbortSignal) => {
  return handleRequest<UpdateTodoResponse>(
    fetch('https://jsonplaceholder.typicode.com/todos/' + todo.id, {
      body: JSON.stringify(todo),
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      signal: as,
    }).then((response) => response.json()),
  )
}
